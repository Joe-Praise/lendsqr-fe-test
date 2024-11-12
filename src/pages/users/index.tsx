import { useCallback, useEffect, useMemo, useState } from 'react';
import CardContainer from '../../components/dashboard/cardcontainer';
import { Spacer } from '../../components/shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import config from '../../config';
import { Button, InputField, Select } from '../../components/form control';
import { UsersResponse, UsersType } from '../../services/queries/users/types';
import mock from '../../services/queries/users/mock.json';
import queries from '../../services/queries/users';
import prevbtn from '/assets/dashboard/image/prev btn.png';
import nextbtn from '/assets/dashboard/image/next btn.png';
import FilterModal from '../../components/dashboard/filtermodal';
import viewUser from '/assets/dashboard/view eye.svg';
import blacklistUser from '/assets/dashboard/delete user.svg';
import activateUser from '/assets/dashboard/active user.svg';
import Loader from '../../components/shared/loader';
import { getUniqueOrganizations } from '../../services/helper';

function paginate(array: any[], page_size = 10, page_number = 1) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

enum Users {
  Active = '1',
  Pending = '2',
  Inactive = '3',
  Blacklisted = '4',
}

function Status(props: { status: `${Users}` }) {
  if (Users.Active === props.status) {
    return <span className='app__badge app__badge--active'>Active</span>;
  }

  if (Users.Pending === props.status) {
    return <span className='app__badge app__badge--pending'>Pending</span>;
  }

  if (Users.Inactive === props.status) {
    return <span className='app__badge app__badge--inactive'>Inactive</span>;
  }

  if (Users.Blacklisted === props.status) {
    return (
      <span className='app__badge app__badge--blacklisted'>Blacklisted</span>
    );
  }

  return null;
}

const options = [
  { label: 'All', value: '' },
  { label: 'Active Users', value: Users.Active },
  { label: 'Pending Users', value: Users.Pending },
  { label: 'Inactive Users', value: Users.Inactive },
  { label: 'Blacklisted Users', value: Users.Blacklisted },
];

function Ellipsis() {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='ellipsis'
    >
      <g clipPath='url(#clip0_5530_2613)'>
        <path
          d='M9.99992 6.1111C10.9221 6.1111 11.6666 5.36666 11.6666 4.44444C11.6666 3.52222 10.9221 2.77777 9.99992 2.77777C9.0777 2.77777 8.33325 3.52222 8.33325 4.44444C8.33325 5.36666 9.0777 6.1111 9.99992 6.1111ZM9.99992 8.33333C9.0777 8.33333 8.33325 9.07777 8.33325 9.99999C8.33325 10.9222 9.0777 11.6667 9.99992 11.6667C10.9221 11.6667 11.6666 10.9222 11.6666 9.99999C11.6666 9.07777 10.9221 8.33333 9.99992 8.33333ZM9.99992 13.8889C9.0777 13.8889 8.33325 14.6333 8.33325 15.5555C8.33325 16.4778 9.0777 17.2222 9.99992 17.2222C10.9221 17.2222 11.6666 16.4778 11.6666 15.5555C11.6666 14.6333 10.9221 13.8889 9.99992 13.8889Z'
          fill='#545F7D'
        />
      </g>
      <defs>
        <clipPath id='clip0_5530_2613'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

export enum SearchParams {
  status = 'status',
  organization = 'organization',
  username = 'username',
  email = 'email',
  date = 'date',
  phone_number = 'phone_number',
  pageNumber = 'pageNumber',
  pageSize = 'pageSize',
  totalPages = 'totalPages',
}

export const useSearchQueries = () => {
  const [searchParams] = useSearchParams();

  return useMemo(
    () => ({
      status: searchParams.get(SearchParams.status) || undefined,
      organization: searchParams.get(SearchParams.organization) || undefined,
      username: searchParams.get(SearchParams.username) || undefined,
      date: searchParams.get(SearchParams.date) || undefined,
      email: searchParams.get(SearchParams.email) || undefined,
      phone_number: searchParams.get(SearchParams.phone_number) || undefined,
      pageNumber:
        searchParams.get(SearchParams.pageNumber) ||
        config.queryArgs.pageNumber,
      pageSize:
        searchParams.get(SearchParams.pageSize) || config.queryArgs.pageSize,
      totalPages: mock.length / config.queryArgs.pageSize,
    }),
    [searchParams]
  );
};

const Page = () => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const [filterQueries, setFilterQueries] = useState({
    username: '',
    organization: '',
    status: '',
    date: '',
    email: '',
    phone_number: '',
  });

  const [openMenu, setOpenMenu] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [actionId, setActionId] = useState('');
  const query = useSearchQueries();
  const [pages, setPages] = useState<number[]>([]);
  const [activePage, setActivePage] = useState(Number(query.pageNumber));

  const pageCount = Number(query.totalPages);

  const { data, isLoading } = queries.read({ query });

  const slicedData = paginate(
    data,
    Number(query.pageSize),
    Number(query.pageNumber)
  ) as UsersResponse['data'];

  const handlePage = (page: number) => {
    if (0 < page || Number(query.totalPages) > page) {
      setActivePage(page);
      setSearchParams((params) => {
        params.set(SearchParams.pageNumber, String(page));

        return params;
      });
    }
  };

  const buildPages = useCallback(() => {
    const halfOfPageCount = pageCount / 2;

    let start = 1,
      end = pageCount > 5 ? pageCount / halfOfPageCount + 1 : pageCount;

    if (activePage >= 3 && activePage < pageCount - 3) {
      start = activePage - 2;
      end = activePage + 2;
    }

    if (pageCount > 5 && activePage > pageCount - 5) {
      start = pageCount - 3;
      end = pageCount - 1;
    }

    const newPages = [];
    for (let i = start; i <= end; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  }, [activePage, pageCount]);

  useEffect(() => buildPages(), [activePage, buildPages]);

  const handleToggleMenu = () => {
    setOpenMenu((prevState) => !prevState);
  };

  const handleToggleAction = (item: UsersType) => {
    if (actionId === String(item.id)) {
      setOpenAction(false);
      setActionId('');
      return;
    }

    setActionId(String(item.id));
    setOpenAction((prevState) => !prevState);
  };

  const handleFilterSubmit = () => {
    setSearchParams(filterQueries);
    handleToggleMenu();
    // console.log(new URLSearchParams(filterQueries).toString());
  };

  const handleRestFilters = () => {
    setFilterQueries({
      username: '',
      organization: '',
      status: '',
      date: '',
      email: '',
      phone_number: '',
    });
  };

  return (
    <div className='dashboard__main--content scrollbar'>
      <h2>Users</h2>

      <Spacer className='spacer_50'>
        <CardContainer />
      </Spacer>

      <Spacer className='spacer_30 position-relative'>
        <div className='table-responsive dashboard__table'>
          <table className='table mb-0'>
            <thead>
              <tr>
                <th className=' '>
                  Organization
                  <button onClick={handleToggleMenu}>
                    <img
                      src='/assets/dashboard/image/filter-results-button.png'
                      alt=''
                    />
                  </button>
                </th>
                <th className=' ' onClick={handleToggleMenu}>
                  Username{' '}
                  <button>
                    <img
                      src='/assets/dashboard/image/filter-results-button.png'
                      alt=''
                    />
                  </button>
                </th>
                <th className=' ' onClick={handleToggleMenu}>
                  Email{' '}
                  <button>
                    <img
                      src='/assets/dashboard/image/filter-results-button.png'
                      alt=''
                    />
                  </button>
                </th>
                <th className=' ' onClick={handleToggleMenu}>
                  Phone Number{' '}
                  <button>
                    <img
                      src='/assets/dashboard/image/filter-results-button.png'
                      alt=''
                    />
                  </button>
                </th>
                <th className=' ' onClick={handleToggleMenu}>
                  Date Joined{' '}
                  <button>
                    <img
                      src='/assets/dashboard/image/filter-results-button.png'
                      alt=''
                    />
                  </button>
                </th>
                <th className=' ' onClick={handleToggleMenu}>
                  Status{' '}
                  <button>
                    <img
                      src='/assets/dashboard/image/filter-results-button.png'
                      alt=''
                    />
                  </button>
                </th>
                <th className=''></th>
              </tr>
            </thead>

            <tbody>
              {slicedData?.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className=''>{item.organization}</td>
                    <td className=''>{item.username}</td>
                    <td className=''>{item.email_address}</td>
                    <td className=''>{item.phone_number}</td>
                    <td className=''>{item.date_joined}</td>
                    <td className=''>
                      <Status
                        status={String(item.status) as unknown as Users}
                      />
                    </td>
                    <td className='' onClick={() => handleToggleAction(item)}>
                      <Ellipsis />
                    </td>
                    {actionId === String(item.id) && (
                      <FilterModal
                        className='users__action--wrapper'
                        openMenu={openAction}
                      >
                        <ul className='users__action--container'>
                          <li
                            onClick={() =>
                              navigate(`/dashboard/users/${String(item.id)}`)
                            }
                          >
                            <img src={viewUser} alt='view user icon' />
                            <span>View Details</span>
                          </li>
                          <li>
                            <img
                              src={blacklistUser}
                              alt='blacklist user icon'
                            />
                            <span>Blacklist User</span>
                          </li>
                          <li>
                            <img src={activateUser} alt='activate user icon' />
                            <span>Activate User</span>
                          </li>
                        </ul>
                      </FilterModal>
                    )}
                  </tr>
                );
              })}

              {!slicedData?.length && !isLoading && (
                <tr>
                  <td className='' colSpan={8}>
                    No record available
                  </td>
                </tr>
              )}

              {!slicedData?.length && isLoading && (
                <tr>
                  <td className='h-50' colSpan={8}>
                    <Loader />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* FILTER TABLE MODAL STARTS HERE */}
          <FilterModal
            openMenu={openMenu}
            className='dashboard__table--filter__modal'
          >
            <div className='users-filter__input--container'>
              <Select
                className=''
                label='Organization'
                // placeholder='Organization'
                options={getUniqueOrganizations(mock)}
                onChange={(e) => {
                  setFilterQueries((prev) => {
                    return {
                      ...prev,
                      organization: (e.target as any).value,
                    };
                  });
                }}
              />
            </div>
            <div className='users-filter__input--container'>
              <InputField
                label='Username'
                placeholder='User'
                onChange={(e) => {
                  setFilterQueries((prev) => {
                    return {
                      ...prev,
                      username: (e.target as any).value,
                    };
                  });
                }}
              />
            </div>
            <div className='users-filter__input--container'>
              <InputField
                label='Email'
                placeholder='Email'
                onChange={(e) => {
                  setFilterQueries((prev) => {
                    return {
                      ...prev,
                      email: (e.target as any).value,
                    };
                  });
                }}
              />
            </div>
            <div className='users-filter__input--container'>
              <InputField
                label='Date'
                type='date'
                placeholder='Date'
                className='date'
                onChange={(e) => {
                  setFilterQueries((prev) => {
                    return {
                      ...prev,
                      date: (e.target as any).value,
                    };
                  });
                }}
              />
            </div>
            <div className='users-filter__input--container'>
              <InputField
                label='Phone Number'
                placeholder='Phone Number'
                onChange={(e) => {
                  setFilterQueries((prev) => {
                    return {
                      ...prev,
                      phone_number: (e.target as any).value,
                    };
                  });
                }}
              />
            </div>
            <div className='users-filter__input--container'>
              <Select
                options={options}
                optionLabel='label'
                optionValue='value'
                label='Status'
                onChange={(e) => {
                  setFilterQueries((prev) => {
                    return {
                      ...prev,
                      status: (e.target as any).value,
                    };
                  });
                }}
              />
            </div>
            <div className='users-filter__btn--container'>
              <Button
                isLoading={isLoading}
                value='Reset'
                type='button'
                className='border-radius_8 reset__btn'
                onClick={handleRestFilters}
              />
              <Button
                isLoading={isLoading}
                value='Filter'
                type='button'
                className='border-radius_8 filter__btn'
                onClick={handleFilterSubmit}
              />
            </div>
          </FilterModal>
          {/* FILTER TABLE MODAL ENDS HERE */}
        </div>
        {/* PAGINATION STARTS HERE */}

        <div className='table__pagination'>
          <div className='table__pagination--size '>
            <p>Showing</p>
            <Select className='table__pagination--select' options={['10']} />
            <p>out of {mock?.length}</p>
          </div>

          {/* PAGINATION CONTROLS STARTS HERE */}
          <div className='table__pagination--ctrl'>
            <button
              className='btn'
              onClick={() => handlePage(activePage - 1)}
              disabled={Number(query.pageNumber) <= 1}
            >
              <img src={prevbtn} alt='next button img' />
            </button>
            <div className='table__pagination--ctrl--nos'>
              {activePage > 3 && (
                <button
                  onClick={() => handlePage(1)}
                  className={`${
                    Number(query.pageNumber) === 1 ? 'active' : ''
                  }  btn`}
                >
                  {1}
                </button>
              )}
              {activePage > 3 && <span>...</span>}
              {pages.map((page) => {
                return (
                  <button
                    key={page}
                    className={`${
                      Number(query.pageNumber) === page ? 'active' : ''
                    } btn`}
                    onClick={() => handlePage(page)}
                  >
                    {page}
                  </button>
                );
              })}
              {activePage < pageCount - 2 && <span>...</span>}
              {pageCount > 5 && (
                <button
                  className={`${
                    Number(query.pageNumber) === pageCount ? 'active' : ''
                  } btn`}
                  onClick={() => handlePage(pageCount)}
                >
                  {pageCount}
                </button>
              )}
            </div>
            <button
              className='btn'
              onClick={() => handlePage(activePage + 1)}
              disabled={Number(query.pageNumber) >= Number(query.totalPages)}
              data-testid='nextBtn'
            >
              <img src={nextbtn} alt='next button img' />
            </button>
          </div>
          {/* PAGINATION CONTROLS ENDS HERE */}
        </div>

        {/* PAGINATION ENDS HERE */}
      </Spacer>
      {/* <div></div> */}
    </div>
  );
};

export default Page;
