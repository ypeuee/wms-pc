import { CloseCircleOutlined } from '@ant-design/icons';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { ProColumnType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { useIntl } from '@umijs/max';

import { Card, Col, message, Popover, Row } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';
import UpdloadForm from '../components/upload-form';
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

const fieldLabels = {
  name: '物料名称',
  code: '物料编码',
  barcode: '物料条码',
  unit: '计量单位',
  spec: '规格',
  brand: '品牌',

  lenght: '长度（kg）',
  width: '宽度（kg）',
  height: '高度（kg）',
  volume: '体积（cdm）',
  netWeight: '净重（kg）',
  grossWeight: '毛重（kg）',

  image: '图片',
};

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
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

  const columns: ProColumnType<TableFormDateType>[] = [
    {
      title: '物料子码',
      dataIndex: 'name',
      key: 'name',
      width: '80%',
    },
    {
      title: '操作',
      key: 'action',
      width: '20%',
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
          id: 'basic-data.material.add-form.pageContainer',
          defaultMessage: '创建新物料，物料名称、物料编码、物料条码和单位为必填项。',
        })}
      >
        <Card
          title={intl.formatMessage({
            id: 'basic-data.material.add-form.titleBasic',
            defaultMessage: '物料信息',
          })}
          className={styles.card}
          bordered={false}
        >
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={fieldLabels.name}
                name="name"
                rules={[
                  {
                    required: true,
                    message:
                      intl.formatMessage({
                        id: 'basic-data.material.add-form.name',
                        defaultMessage: '物料名称',
                      }) + rules,
                  },
                ]}
                placeholder={
                  placeholder +
                  intl.formatMessage({
                    id: 'basic-data.material.add-form.name',
                    defaultMessage: '物料名称',
                  })
                }
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={fieldLabels.code}
                name="code"
                rules={[
                  {
                    required: true,
                    message:
                      intl.formatMessage({
                        id: 'basic-data.material.add-form.name',
                        defaultMessage: '物料编码',
                      }) + rules,
                  },
                ]}
                placeholder={
                  placeholder +
                  intl.formatMessage({
                    id: 'basic-data.material.add-form.name',
                    defaultMessage: '物料编码',
                  })
                }
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                label={fieldLabels.barcode}
                name="barcode"
                rules={[
                  {
                    required: true,
                    message:
                      intl.formatMessage({
                        id: 'basic-data.material.add-form.barcode',
                        defaultMessage: '物料条码',
                      }) + rules,
                  },
                ]}
                placeholder={
                  placeholder +
                  intl.formatMessage({
                    id: 'basic-data.material.add-form.barcode',
                    defaultMessage: '物料条码',
                  })
                }
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={fieldLabels.unit}
                name="unit"
                rules={[
                  {
                    required: true,
                    message:
                      intl.formatMessage({
                        id: 'basic-data.material.add-form.unit',
                        defaultMessage: '计量单位',
                      }) + rules,
                  },
                ]}
                options={[
                  {
                    label: intl.formatMessage({
                      id: 'basic-data.material.add-form.unit_1',
                      defaultMessage: '个',
                    }),
                    value: 1,
                  },
                  {
                    label: intl.formatMessage({
                      id: 'basic-data.material.add-form.unit_2',
                      defaultMessage: '箱',
                    }),
                    value: 1,
                  },
                  {
                    label: intl.formatMessage({
                      id: 'basic-data.material.add-form.unit_3',
                      defaultMessage: '包',
                    }),
                    value: 1,
                  },
                  {
                    label: intl.formatMessage({
                      id: 'basic-data.material.add-form.unit_4',
                      defaultMessage: '件',
                    }),
                    value: 1,
                  },
                ]}
                placeholder={
                  placeholder +
                  intl.formatMessage({
                    id: 'basic-data.material.add-form.unit',
                    defaultMessage: '计量单位',
                  })
                }
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={fieldLabels.spec}
                name="spec"
                placeholder={
                  placeholder +
                  intl.formatMessage({
                    id: 'basic-data.material.add-form.spec',
                    defaultMessage: '规格',
                  })
                }
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                label={fieldLabels.brand}
                name="brand"
                placeholder={
                  placeholder +
                  intl.formatMessage({
                    id: 'basic-data.material.add-form.brand',
                    defaultMessage: '品牌',
                  })
                }
              />
            </Col>
          </Row>
        </Card>
        <Card
          title={intl.formatMessage({
            id: 'basic-data.material.add-form.titleVolume',
            defaultMessage: '重量/体积',
          })}
          className={styles.card}
          bordered={false}
        >
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={fieldLabels.lenght}
                name="lenght"
                placeholder={
                  placeholder +
                  intl.formatMessage({
                    id: 'basic-data.material.add-form.lenght',
                    defaultMessage: '长度（kg）',
                  })
                }
                fieldProps={{
                  style: { width: '100%' },
                  addonAfter: 'kg',
                }}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={fieldLabels.width}
                name="width"
                placeholder={
                  placeholder +
                  intl.formatMessage({
                    id: 'basic-data.material.add-form.width',
                    defaultMessage: '宽度（kg）',
                  })
                }
                fieldProps={{
                  style: { width: '100%' },
                  addonAfter: 'kg',
                }}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                label={fieldLabels.height}
                name="height"
                placeholder={
                  placeholder +
                  intl.formatMessage({
                    id: 'basic-data.material.add-form.height',
                    defaultMessage: '高度（kg）',
                  })
                }
                fieldProps={{
                  style: { width: '100%' },
                  addonAfter: 'kg',
                }}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={fieldLabels.volume}
                name="volume"
                placeholder={
                  placeholder +
                  intl.formatMessage({
                    id: 'basic-data.material.add-form.volume',
                    defaultMessage: '体积（cdm）',
                  })
                }
                fieldProps={{
                  style: { width: '100%' },
                  addonAfter: 'cdm',
                }}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={fieldLabels.netWeight}
                name="netWeight"
                placeholder={
                  placeholder +
                  intl.formatMessage({
                    id: 'basic-data.material.add-form.netWeight',
                    defaultMessage: '净重（kg）',
                  })
                }
                fieldProps={{
                  style: { width: '100%' },
                  addonAfter: 'kg',
                }}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                label={fieldLabels.grossWeight}
                name="grossWeight"
                placeholder={
                  placeholder +
                  intl.formatMessage({
                    id: 'basic-data.material.add-form.grossWeight',
                    defaultMessage: '毛重（kg）',
                  })
                }
                fieldProps={{
                  style: { width: '100%' },
                  addonAfter: 'kg',
                }}
              />
            </Col>
          </Row>
        </Card>
        <Card
          title={intl.formatMessage({
            id: 'basic-data.material.add-form.titleImage',
            defaultMessage: '物料图片',
          })}
          className={styles.card}
          bordered={false}
        >
          <UpdloadForm />
        </Card>
        <Card title="物料子码" bordered={false}>
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
