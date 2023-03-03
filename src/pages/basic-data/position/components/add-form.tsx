import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Card, Col, Row } from 'antd';
import React from 'react';
import styles from './add-form.less';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type AddFormProps = {
  onFinish: (values: FormValueType) => Promise<void>;
  open: boolean;
  onOpenChange: (visible: boolean) => void;
};

const AddForm: React.FC<AddFormProps> = (props) => {
  const intl = useIntl();
  //必填提示
  const pageRulesMsg = intl.formatMessage({
    id: 'page.ruls',
    defaultMessage: '必填项',
  });

  return (
    <ModalForm
      title={intl.formatMessage({
        id: 'basic-data.position.add-form.title',
        defaultMessage: 'New rule',
      })}
      width="650px"
      open={props.open}
      onFinish={props.onFinish}
      onOpenChange={props.onOpenChange}
    >
      <Card title="仓库信息" className={styles.card} bordered={false}>
        <Row gutter={24}>
          <Col lg={10} md={12} sm={16}>
            <ProFormText
              width="sm"
              name="code"
              label={intl.formatMessage({
                id: 'basic-data.position.add-form.code',
                defaultMessage: '仓位编码',
              })}
              rules={[
                {
                  required: true,
                  message:
                    intl.formatMessage({
                      id: 'basic-data.position.add-form.code',
                      defaultMessage: '仓位编码',
                    }) + pageRulesMsg,
                },
              ]}
            />
          </Col>
          <Col xl={{ span: 10, offset: 2 }} lg={{ span: 12 }} md={{ span: 14 }} sm={16}>
            <ProFormSelect
              name="storageType"
              width="sm"
              label={intl.formatMessage({
                id: 'basic-data.position.add-form.storageType',
                defaultMessage: '存储类型',
              })}
              valueEnum={{
                1: (
                  <FormattedMessage
                    id="basic-data.position.add-form.storageType_1"
                    defaultMessage="平面库位"
                  />
                ),
                2: (
                  <FormattedMessage
                    id="basic-data.position.add-form.storageType_2"
                    defaultMessage="高架库位"
                  />
                ),
                3: (
                  <FormattedMessage
                    id="basic-data.position.add-form.storageType_3"
                    defaultMessage="隔板货架"
                  />
                ),
                4: (
                  <FormattedMessage
                    id="basic-data.position.add-form.storageType_4"
                    defaultMessage="AGV拣货区"
                  />
                ),
                5: (
                  <FormattedMessage
                    id="basic-data.position.add-form.storageType_5"
                    defaultMessage="预包库位"
                  />
                ),
                6: (
                  <FormattedMessage
                    id="basic-data.position.add-form.storageType_6"
                    defaultMessage="临期库位"
                  />
                ),
              }}
              rules={[
                {
                  required: true,
                  message:
                    intl.formatMessage({
                      id: 'basic-data.position.add-form.storageType',
                      defaultMessage: '存储类型',
                    }) + pageRulesMsg,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={10} md={12} sm={16}>
            <ProFormSelect
              name="positionType"
              width="sm"
              label={intl.formatMessage({
                id: 'basic-data.position.add-form.positionType',
                defaultMessage: '库位类型',
              })}
              valueEnum={{
                1: (
                  <FormattedMessage
                    id="basic-data.position.add-form.positionType_1"
                    defaultMessage="分拣仓位"
                  />
                ),
                2: (
                  <FormattedMessage
                    id="basic-data.position.add-form.positionType_2"
                    defaultMessage="存储仓位"
                  />
                ),
              }}
              rules={[
                {
                  required: true,
                  message:
                    intl.formatMessage({
                      id: 'basic-data.position.add-form.positionType',
                      defaultMessage: '库位类型',
                    }) + pageRulesMsg,
                },
              ]}
            />
          </Col>
          <Col xl={{ span: 10, offset: 2 }} lg={{ span: 12 }} md={{ span: 14 }} sm={16}>
            <ProFormSelect
              name="mateialType"
              width="sm"
              label={intl.formatMessage({
                id: 'basic-data.position.add-form.mateialType',
                defaultMessage: '良次品',
              })}
              valueEnum={{
                1: (
                  <FormattedMessage
                    id="basic-data.position.add-form.mateialType_1"
                    defaultMessage="良品"
                  />
                ),
                2: (
                  <FormattedMessage
                    id="basic-data.position.add-form.mateialType_2"
                    defaultMessage="次品"
                  />
                ),
                3: (
                  <FormattedMessage
                    id="basic-data.position.add-form.mateialType_3"
                    defaultMessage="废品"
                  />
                ),
              }}
              rules={[
                {
                  required: true,
                  message:
                    intl.formatMessage({
                      id: 'basic-data.position.add-form.mateialType',
                      defaultMessage: '良次品',
                    }) + pageRulesMsg,
                },
              ]}
            />
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={10} md={12} sm={16}>
            <ProFormText
              width="sm"
              name="area"
              label={intl.formatMessage({
                id: 'basic-data.position.add-form.area',
                defaultMessage: '区域',
              })}
              rules={[
                {
                  required: true,
                  message:
                    intl.formatMessage({
                      id: 'basic-data.position.add-form.area',
                      defaultMessage: '区域',
                    }) + pageRulesMsg,
                },
              ]}
            />
          </Col>
          <Col xl={{ span: 10, offset: 2 }} lg={{ span: 12 }} md={{ span: 14 }} sm={16}>
            <ProFormText
              width="sm"
              name="tunnel"
              label={
                <FormattedMessage id="basic-data.position.add-form.tunnel" defaultMessage="巷道" />
              }
              rules={[
                {
                  required: true,
                  message:
                    intl.formatMessage({
                      id: 'basic-data.position.add-form.area',
                      defaultMessage: '区域',
                    }) + pageRulesMsg,
                },
              ]}
            />
          </Col>
        </Row>
      </Card>
    </ModalForm>
  );
};

export default AddForm;
