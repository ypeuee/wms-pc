import { addRule, removeRule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined, DeleteOutlined,UploadOutlined ,DownloadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';

import { query } from './service';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: Position.ListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: Position.ListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.code),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<Position.ListItem>();
  const [selectedRowsState, setSelectedRows] = useState<Position.ListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<Position.ListItem>[] = [
    {
      title: <FormattedMessage id="basic-data.position.table.code" defaultMessage="仓位编码" />,
      dataIndex: 'name',
      tip: intl.formatMessage({
        id: 'basic-data.position.table.code.tip',
        defaultMessage: '同仓库内仓位编码唯一',
      }),
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: (
        <FormattedMessage id="basic-data.position.table.storageType" defaultMessage="存储类型" />
      ),
      dataIndex: 'storageType',
      hideInForm: true,
      valueEnum: {
        1: {
          text: (
            <FormattedMessage
              id="basic-data.position.table.storageType_1"
              defaultMessage="平面库位"
            />
          ),
        },
        2: {
          text: (
            <FormattedMessage
              id="basic-data.position.table.storageType_2"
              defaultMessage="高架库位"
            />
          ),
        },
        3: {
          text: (
            <FormattedMessage
              id="basic-data.position.table.storageType_3"
              defaultMessage="隔板货架"
            />
          ),
        },
        4: {
          text: (
            <FormattedMessage
              id="basic-data.position.table.storageType_4"
              defaultMessage="AGV拣货区"
            />
          ),
        },
        5: {
          text: (
            <FormattedMessage
              id="basic-data.position.table.storageType_5"
              defaultMessage="预包库位"
            />
          ),
        },
        6: {
          text: (
            <FormattedMessage
              id="basic-data.position.table.storageType_6"
              defaultMessage="临期库位"
            />
          ),
        },
      },
    },
    {
      title: (
        <FormattedMessage id="basic-data.position.table.positionType" defaultMessage="库位类型" />
      ),
      hideInForm: true,
      valueEnum: {
        1: {
          text: (
            <FormattedMessage
              id="basic-data.position.table.positionType_1"
              defaultMessage="分拣仓位"
            />
          ),
        },
        2: {
          text: (
            <FormattedMessage
              id="basic-data.position.table.positionType_2"
              defaultMessage="存储仓位"
            />
          ),
        },
      },
    },
    {
      title: (
        <FormattedMessage id="basic-data.position.table.mateialType" defaultMessage="良次品" />
      ),
      hideInForm: true,
      valueEnum: {
        1: {
          text: (
            <FormattedMessage id="basic-data.position.table.positionType_1" defaultMessage="良品" />
          ),
        },
        2: {
          text: (
            <FormattedMessage id="basic-data.position.table.positionType_2" defaultMessage="次品" />
          ),
        },

        3: {
          text: (
            <FormattedMessage id="basic-data.position.table.mateialType_3" defaultMessage="废品" />
          ),
        },
      },
    },
    {
      title: <FormattedMessage id="basic-data.position.table.status" defaultMessage="仓位状态" />,
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: <FormattedMessage id="basic-data.position.table.status_0" defaultMessage="启用" />,
          status: 'Success',
        },
        1: {
          text: <FormattedMessage id="basic-data.position.table.status_1" defaultMessage="禁用" />,
          status: 'Error',
        },
      },
    },
    {
      title: <FormattedMessage id="basic-data.position.table.area" defaultMessage="区域" />,
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="basic-data.position.table.tunnel" defaultMessage="巷道" />,
      valueType: 'textarea',
      filterSearch: false,
    },
    // {
    //   title: (
    //     <FormattedMessage id="basic-data.position.table.upPriority" defaultMessage="上架优先级" />
    //   ),
    //   valueType: 'textarea',
    // },
    // {
    //   title: (
    //     <FormattedMessage id="basic-data.position.table.downPriority" defaultMessage="下架优先级" />
    //   ),
    //   valueType: 'textarea',
    // },
    // {
    //   title: (
    //     <FormattedMessage id="basic-data.position.table.WarehouseName" defaultMessage="仓库" />
    //   ),
    //   valueType: 'textarea',
    //   hideInForm: true,
    // },
    // {
    //   title: (
    //     <FormattedMessage id="basic-data.position.table.memberName" defaultMessage="会员名称" />
    //   ),
    //   valueType: 'textarea',
    // },
    // {
    //   title: <FormattedMessage id="basic-data.position.table.memberCode" defaultMessage="会员号" />,
    //   valueType: 'textarea',
    // },
    {
      title: (
        <FormattedMessage id="basic-data.position.table.createTime" defaultMessage="创建时间" />
      ),
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
  ];

  return (
    <PageContainer>
      <ProTable<Position.ListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'basic-data.position.table.title',
          defaultMessage: '仓位列表',
        })}
        actionRef={actionRef}
        rowKey="code"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          //新增
          <Button
            type="primary"
            key="add"
            onClick={() => {
              window.location.href="/basic-data/material/add-form?id=0"}  
            }
          >
            

            {<PlusOutlined />}
            {intl.formatMessage({
              id: 'pages.button.new',
              defaultMessage: '新增',
            })}
          </Button>,
          //导入
          <Button
            key="import"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            {<DownloadOutlined />}
            {intl.formatMessage({
              id: 'pages.button.import',
              defaultMessage: '导入',
            })}
          </Button>,           

          //导出
          <Button          
            key="export"
            onClick={() => {
              handleModalOpen(true);
            }}            >
            {<UploadOutlined  />}
            {intl.formatMessage({
              id: 'pages.button.export',
              defaultMessage: '导出',
            })}
          </Button>,

          //删除 ghost danger
          <Button key="lock" type="default" danger>
          <DeleteOutlined />
            {intl.formatMessage({
              id: 'pages.button.delete',
              defaultMessage: '删除',
            })}
          </Button>,
        ]}
        request={query}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />

      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.code && (
          <ProDescriptions<Position.ListItem>
            column={2}
            title={currentRow?.code}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.code,
            }}
            columns={columns as ProDescriptionsItemProps<Position.ListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
