import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, message, Popconfirm, Table } from 'antd';
import type { FC } from 'react';
import React, { useState } from 'react';
import { useIntl } from 'umi';

import styles from '../style.less';

type TableFormDateType = {
  key: string;
  workId?: string;
  name?: string;
  department?: string;
  isNew?: boolean;
  editable?: boolean;
};
type TableFormProps = {
  value?: TableFormDateType[];
  onChange?: (value: TableFormDateType[]) => void;
};

const TableForm: FC<TableFormProps> = ({ value, onChange }) => {
  const [clickedCancel, setClickedCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [cacheOriginData, setCacheOriginData] = useState({});
  const [data, setData] = useState(value);

  const getRowByKey = (key: string, newData?: TableFormDateType[]) =>
    (newData || data)?.filter((item) => item.key === key)[0];

  const toggleEditable = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.preventDefault();
    const newData = data?.map((item) => ({ ...item }));
    const target = getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        cacheOriginData[key] = { ...target };
        setCacheOriginData(cacheOriginData);
      }
      target.editable = !target.editable;
      setData(newData);
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  /**@name 提示语：请输入   */
  const placeholder = intl.formatMessage({
    id: 'pages.placeholder',
    defaultMessage: '请输入',
  });

  /**@name 提示语：为必填项   */
  const rules = intl.formatMessage({
    id: 'pages.rules',
    defaultMessage: '为必填项',
  });

  const newMember = () => {
    const newData = data?.map((item) => ({ ...item })) || [];

    newData.push({
      key: `NEW_TEMP_ID_${index}`,
      workId: '',
      name: '',
      department: '',
      editable: true,
      isNew: true,
    });

    setIndex(index + 1);
    setData(newData);
  };

  const remove = (key: string) => {
    const newData = data?.filter((item) => item.key !== key) as TableFormDateType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string,
  ) => {
    const newData = [...(data as TableFormDateType[])];
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      setData(newData);
    }
  };

  const saveRow = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.persist();
    setLoading(true);
    setTimeout(() => {
      if (clickedCancel) {
        setClickedCancel(false);
        return;
      }
      const target = getRowByKey(key) || ({} as any);
      if (!target.workId || !target.name || !target.department) {
        message.error('请填写完整成员信息。');
        (e.target as HTMLInputElement).focus();
        setLoading(false);
        return;
      }
      delete target.isNew;
      toggleEditable(e, key);
      if (onChange) {
        onChange(data as TableFormDateType[]);
      }
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Enter') {
      saveRow(e, key);
    }
  };

  const cancel = (e: React.MouseEvent, key: string) => {
    setClickedCancel(true);
    e.preventDefault();
    const newData = [...(data as TableFormDateType[])];
    // 编辑前的原始数据
    let cacheData = [];
    cacheData = newData.map((item) => {
      if (item.key === key) {
        if (cacheOriginData[key]) {
          const originItem = {
            ...item,
            ...cacheOriginData[key],
            editable: false,
          };
          delete cacheOriginData[key];
          setCacheOriginData(cacheOriginData);
          return originItem;
        }
      }
      return item;
    });
    setData(cacheData);
    setClickedCancel(false);
  };

  const fieldTitle = {
    materialName: intl.formatMessage({
      id: 'warehouse-in.add-form.table.materialName',
      defaultMessage: '物料名称',
    }),
    materialCode: intl.formatMessage({
      id: 'warehouse-in.add-form.table.materialCode',
      defaultMessage: '物料编码',
    }),
    quantity: intl.formatMessage({
      id: 'warehouse-in.add-form.table.quantity',
      defaultMessage: '数量',
    }),
    materialType: intl.formatMessage({
      id: 'warehouse-in.add-form.table.materialType',
      defaultMessage: '正残属性',
    }),
    materialBatch: intl.formatMessage({
      id: 'warehouse-in.add-form.table.materialBatch',
      defaultMessage: '批次',
    }),
  };

  const columns = [
    {
      title: fieldTitle.materialName,
      dataIndex: 'materialName',
      key: 'materialName',
      width: '20%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={(e) => handleFieldChange(e, 'materialName', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder={placeholder + fieldTitle.materialName}
            />
          );
        }
        return text;
      },
    },
    {
      title: fieldTitle.materialCode,
      dataIndex: 'materialCode',
      key: 'materialCode',
      width: '20%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e, 'materialCode', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder= {placeholder + fieldTitle.materialCode}
            />
          );
        }
        return text;
      },
    },
    {
      title: fieldTitle.quantity,
      dataIndex: 'quantity',
      key: 'quantity',
      width: '40%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e, 'quantity', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder={placeholder + fieldTitle.quantity}
            />
          );
        }
        return text;
      },      
    },
    {
      title: fieldTitle.materialBatch,
      dataIndex: 'materialBatch',
      key: 'materialBatch',
      width: '40%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e, 'materialBatch', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder={placeholder + fieldTitle.materialBatch}
            />
          );
        }
        return text;
      },      
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: TableFormDateType) => {
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={(e) => saveRow(e, record.key)}>添加</a>
                <Divider type="vertical" />
                <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <a onClick={(e) => saveRow(e, record.key)}>保存</a>
              <Divider type="vertical" />
              <a onClick={(e) => cancel(e, record.key)}>取消</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={(e) => toggleEditable(e, record.key)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <>
      <Table<TableFormDateType>
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={(record) => (record.editable ? styles.editable : '')}
      />
      <Button
        style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
        type="dashed"
        onClick={newMember}
      >
        <PlusOutlined />
        新增成员
      </Button>
    </>
  );
};

export default TableForm;
