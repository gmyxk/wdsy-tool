import { StoreKey, WUHUN_ATTRS } from '@/config';
import { SendWuhunItem } from '@/scheme';
import { cn } from '@/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Card, CardBody } from '@nextui-org/react';
import { useRef } from 'react';
import { SendTemplateCommonProps } from '../send-common';
import { TemplatePiaker } from '../template-picker';

export const SendWuhunTemplate = ({
  mutationFn,
  onSendSuccess,
  actionRef,
}: SendTemplateCommonProps<SendWuhunItem>) => {
  const attrMap = useRef(
    WUHUN_ATTRS.reduce<Record<string, string>>((acc, cur) => {
      acc[cur[0]] = cur[1];
      return acc;
    }, {})
  );

  return (
    <TemplatePiaker<SendWuhunItem>
      storgeKey={StoreKey.WuhunTemplate}
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
                <div className="flex gap-2">
                  {data.attributes.map(({ attribute, value }) => (
                    <div
                      key={attribute}
                      className="text-tiny text-default-500"
                    >{`${attrMap.current[attribute]}: ${value}`}</div>
                  ))}
                </div>
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
