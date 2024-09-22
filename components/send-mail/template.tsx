import { MAIL_ATTACH_INIT, StoreKey } from '@/config';
import { SendMailItem } from '@/scheme';
import { cn } from '@/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Card, CardBody } from '@nextui-org/react';
import { SendTemplateCommonProps } from '../send-common';
import { TemplatePiaker } from '../template-picker';

export const SendMailTemplate = ({
  mutationFn,
  onSendSuccess,
  actionRef,
}: SendTemplateCommonProps) => {
  return (
    <TemplatePiaker<SendMailItem>
      storgeKey={StoreKey.MailTemplate}
      initTemplates={MAIL_ATTACH_INIT.map(({ title, attach }) => {
        return {
          templateName: title,
          data: {
            title: '山有扶苏的祝福',
            message: '祝您生活愉快每一天~',
            attachment: attach,
          },
        };
      })}
      mutationFn={(records) => mutationFn({ records })}
      onSendSuccess={onSendSuccess}
      actionRef={actionRef}
      classNames={{
        content: 'grid-cols-1',
      }}
    >
      {(item, { isSelected, toggleSelectTemplate, deleteHistory }) => {
        const { templateName, data, deleteble } = item;

        return (
          <Card
            key={templateName}
            className={cn(
              'box-border cursor-pointer border-1',
              isSelected ? 'border-primary' : 'border-transparent'
            )}
          >
            <CardBody
              onClick={() => {
                toggleSelectTemplate(templateName);
              }}
              className="flex flex-row items-center gap-4 p-2"
            >
              <div className="flex-grow">
                <div className="text-tiny text-inherit">{templateName}</div>
                <div className="text-tiny text-foreground-400">{data.attachment}</div>
              </div>
              <div>
                <Button
                  isIconOnly
                  isDisabled={!deleteble}
                  size="sm"
                  className={cn({
                    hidden: !deleteble,
                  })}
                  onClick={() => {
                    deleteHistory(templateName);
                  }}
                >
                  <Icon icon="material-symbols:delete" width={22} />
                </Button>
              </div>
            </CardBody>
          </Card>
        );
      }}
    </TemplatePiaker>
  );
};
