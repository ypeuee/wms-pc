import { CloseCircleOutlined } from '@ant-design/icons';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { ProColumnType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { Card, Col, message, Popover, Row } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import styles from './index.less';
import { fakeSubmitForm } from './service';

interface TableFormDateType {
  key: string;
  workId?: string;
  name?: string;
  department?: string;
  isNew?: boolean;
  editable?: boolean;
}

type InternalNamePath = (string | number)[];

const tableData = [
  {
    key: '1',
    materialName: '华为笔记本电脑',
    materialCode: '69237263264',
    quantity: 100,
    materialType: 1,
    materialBatch: '20230310',
  },
  {
    key: '2',
    materialName: '苹果笔记本电脑',
    materialCode: '69237263263',
    quantity: 80,
    materialType: 1,
    materialBatch: '20230310',
  },
  {
    key: '3',
    materialName: '联想笔记本电脑',
    materialCode: '69237263266',
    quantity: 50,
    materialType: 1,
    materialBatch: '20230310',
  },
];

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const AdvancedForm: FC<Record<string, any>> = () => {
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

  const fieldLabels = {
    externalCode: intl.formatMessage({
      id: 'warehouse-in.add-form.externalCode',
      defaultMessage: '外部单据号',
    }), //'外部单据号',
    orderType: intl.formatMessage({
      id: 'warehouse-in.add-form.orderType',
      defaultMessage: '单据类型',
    }), //'单据类型',
    remarks: intl.formatMessage({
      id: 'warehouse-in.add-form.remarks',
      defaultMessage: '备注',
    }), // '备注',
  
  };

  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = async (values: Record<string, any>) => {
    setError([]);
    try {
      await fakeSubmitForm(values);
      message.success('提交成功');
    } catch {
      // console.log
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
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

  const columns: ProColumnType<TableFormDateType>[] = [
    {
      title: fieldTitle.materialName,
      dataIndex: 'materialName',
      key: 'materialName',
      width: '20%',
    },
    {
      title: fieldTitle.materialCode,
      dataIndex: 'materialCode',
      key: 'materialCode',
      width: '20%',
    },
    {
      title: fieldTitle.quantity,
      dataIndex: 'quantity',
      key: 'quantity',
      width: '20%',
    },    {
      title: fieldTitle.materialBatch,
      dataIndex: 'materialBatch',
      key: 'materialBatch',
      width: '20%',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, record: TableFormDateType, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              action?.startEditable(record.key);
            }}
          >
            编辑
          </a>,
        ];
      },
    },
  ];

  return (
    <ProForm
      layout="vertical"
      hideRequiredMark
      submitter={{
        render: (props, dom) => {
          return (
            <FooterToolbar>
              {getErrorInfo(error)}
              {dom}
            </FooterToolbar>
          );
        },
      }}
      initialValues={{ members: tableData }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer
        content={intl.formatMessage({
          id: 'warehouse-in.add-form.content',
          defaultMessage: ' 创建入库任务，并指定入库商品及数量。 ',
        })}
      >
        <Card
          title={<FormattedMessage id="warehouse-in.add-form.title" defaultMessage="入库单信息" />}
          className={styles.card}
          bordered={false}
        >
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={fieldLabels.orderType}
                name="orderType"
                rules={[
                  {
                    required: true,
                    message: fieldLabels.orderType + rules,
                  },
                ]}
                options={[
                  {
                    label: intl.formatMessage({
                      id: 'warehouse-in.add-form.orderType_1',
                      defaultMessage: '采购入库',
                    }),
                    value: 1,
                  },
                  {
                    label: intl.formatMessage({
                      id: 'warehouse-in.add-form.orderType_2',
                      defaultMessage: '销退入库',
                    }),
                    value: 2,
                  },
                  {
                    label: intl.formatMessage({
                      id: 'warehouse-in.add-form.orderType_3',
                      defaultMessage: '盘盈入库',
                    }),
                    value: 3,
                  },
                  {
                    label: intl.formatMessage({
                      id: 'warehouse-in.add-form.orderType_4',
                      defaultMessage: '其他入库',
                    }),
                    value: 4,
                  },
                ]}
                placeholder={placeholder + fieldLabels.orderType}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={fieldLabels.externalCode}
                name="externalCode"
                rules={[
                  {
                    required: false,
                    message: fieldLabels.externalCode + rules,
                  },
                ]}
                placeholder={placeholder + fieldLabels.externalCode}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                label={fieldLabels.remarks}
                name="name2"
                placeholder={placeholder + fieldLabels.remarks}
              />
            </Col>
          </Row>
        </Card>
        <Card title="入库物料" bordered={false}>
          <ProForm.Item name="members">
            <EditableProTable<TableFormDateType>
              recordCreatorProps={{
                record: () => {
                  return {
                    key: `0${Date.now()}`,
                  };
                },
              }}
              columns={columns}
              rowKey="key"
            />
          </ProForm.Item>
        </Card>
      </PageContainer>
    </ProForm>
  );
};

export default AdvancedForm;
