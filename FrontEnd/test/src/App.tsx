import { useEffect, useState } from 'react';

// axios
import { axiosInstance } from './utils/server';

// helpers
import { getOffsetFromPage } from './utils/helpers';

// types 
import { DataServerType } from './types';

// option datas
import { optionOfColumn, optionsOfCondition } from './utils/OptionData';

// custom components
import Input from './components/Input';
import Table from './components/Table';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
import Selection from './components/Selection';

// custom styles
import styles from './App.module.css';


function App() {
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [columnName, setColumnName] = useState('');
  const [condition, setCondition] = useState('');
  const [field, setField] = useState('');
  const [dataFromServer, setData] = useState<DataServerType | undefined>();
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const onChangePage = (page: number) => {
    setOffset(getOffsetFromPage(page, limit))
    setCurrentPage(page)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.
          get(`/table?limit=${limit}&offset=${offset}&columnName=${columnName}&condition=${condition}&field=${field}`);

        setData(res.data)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    const delayDebounceFn = setTimeout(() => {
      getData()
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [columnName, condition, field, offset])

  return (
    <>
      <div className={styles.center}>
        {/* Filters */}
        <div className='mb-4 mt-4'>
          <div className="row g-3">
            <div className="col">
              {/* Selecting column */}
              <Selection options={optionOfColumn}
                name="column" title='Select Column'
                onChangeSelection={(item) => setColumnName(item.value)} />
            </div>
            <div className="col">
              {/* Selecting condition */}
              <Selection options={optionsOfCondition}
                name="quantity" title='Select Condition'
                onChangeSelection={(item) => setCondition(item.value)} />
            </div>
            <div className="col">
              {/* Field for filtering */}
              <Input onChange={(item) => setField(item.value)}
                value={field} placeholder='Value for filter' name='field' title='Value for filtering'
              />
            </div>
          </div>
        </div>
        {/*  */}

        {
          loading ?
            <div className='d-flex justify-content-center'>
              <Loading />
            </div>
            :
            <Table data={dataFromServer?.data} />
        }

        <div className='d-flex justify-content-end'>
          <Pagination onChangePage={onChangePage} pageSize={limit}
            totalItemsCount={dataFromServer?.totalCount || 1} portionSize={5}
            currentPage={currentPage} />
        </div>
      </div>
    </>
  )
}

export default App
