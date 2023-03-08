import {
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  PrinterOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer } from 'antd';
import React, { useRef, useState } from 'react';

import { query } from './service';

const TableList: React.FC = () => {
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
      title: <FormattedMessage id="warehouse-in.order-form.table.code" defaultMessage="入库单号" />,
      dataIndex: 'code',
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
        <FormattedMessage
          id="warehouse-in.order-form.table.externalCode"
          defaultMessage="外部单号"
        />
      ),
      dataIndex: 'externalCode',
      valueType: 'textarea',
    },

    {
      title: (
        <FormattedMessage
          id="warehouse-in.order-form.table.orderStatus"
          defaultMessage="单据状态"
        />
      ),
      dataIndex: 'orderStatus',
      hideInForm: true,
      valueEnum: {
        1: {
          text: (
            <FormattedMessage
              id="warehouse-in.order-form.table.orderStatus_1"
              defaultMessage="已创建"
            />
          ),
        },
        2: {
          text: (
            <FormattedMessage
              id="warehouse-in.order-form.table.orderStatus_2"
              defaultMessage="部分入库"
            />
          ),
        },
        3: {
          text: (
            <FormattedMessage
              id="warehouse-in.order-form.table.orderStatus_3"
              defaultMessage="已入库"
            />
          ),
        },
        4: {
          text: (
            <FormattedMessage
              id="warehouse-in.order-form.table.orderStatus_4"
              defaultMessage="强制完成"
            />
          ),
        },
      },
    },
    {
      title: <FormattedMessage id="warehouse-in.order-form.table.status" defaultMessage="状态" />,
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        1: {
          text: (
            <FormattedMessage id="warehouse-in.order-form.table.status_1" defaultMessage="正常" />
          ),
        },
        2: {
          text: (
            <FormattedMessage id="warehouse-in.order-form.table.status_2" defaultMessage="挂起" />
          ),
        },
        3: {
          text: (
            <FormattedMessage id="warehouse-in.order-form.table.status_3" defaultMessage="撒单" />
          ),
        },
      },
    },

    {
      title: <FormattedMessage id="warehouse-in.order-form.table.total" defaultMessage="总数" />,
      dataIndex: 'total',
      valueType: 'textarea',
    },

    // {
    //   title: (
    //     <FormattedMessage id="warehouse-in.order-form.table.WarehouseName" defaultMessage="仓库" />
    //   ),
    //   valueType: 'textarea',
    //   hideInForm: true,
    // },
    // {
    //   title: (
    //     <FormattedMessage id="warehouse-in.order-form.table.memberName" defaultMessage="会员名称" />
    //   ),
    //   valueType: 'textarea',
    // },
    // {
    //   title: <FormattedMessage id="warehouse-in.order-form.table.memberCode" defaultMessage="会员号" />,
    //   valueType: 'textarea',
    // },
    {
      title: (
        <FormattedMessage id="warehouse-in.order-form.table.createTime" defaultMessage="创建时间" />
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
          id: 'warehouse-in.order-form.table.title',
          defaultMessage: '入库任务列表',
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
              window.location.href = '/warehouse-in/add-form?id=0';
            }}
          >
            {<PlusOutlined />}
            {intl.formatMessage({
              id: 'pages.button.new',
              defaultMessage: '新增',
            })}
          </Button>,
          //导入
          <Button key="import" onClick={() => {}}>
            {<DownloadOutlined />}
            {intl.formatMessage({
              id: 'pages.button.import',
              defaultMessage: '导入',
            })}
          </Button>,

          //导出
          <Button key="export" onClick={() => {}}>
            {<UploadOutlined />}
            {intl.formatMessage({
              id: 'pages.button.export',
              defaultMessage: '导出',
            })}
          </Button>,
          //打印
          <Button key="print" onClick={() => {}}>
            <PrinterOutlined />
            {intl.formatMessage({
              id: 'pages.button.print',
              defaultMessage: '打印',
            })}
          </Button>,
          //删除 ghost danger
          <Button key="cancelOrder" type="default" danger>
            <DeleteOutlined />
            {intl.formatMessage({
              id: 'pages.button.cancelOrder',
              defaultMessage: '撒单',
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
