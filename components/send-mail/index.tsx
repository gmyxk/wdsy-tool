'use client';

import { MAIL_ATTACH_INIT } from '@/config';
import { axiosPost } from '@/lib/axios';
import { SendMailApiReq } from '@/scheme';
import { useRoleStore } from '@/store';
import { Icon } from '@iconify/react';
import {
  Button,
  Checkbox,
  Chip,
  Code,
  Input,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ScrollShadow,
  Textarea,
} from '@nextui-org/react';
import { produce } from 'immer';
import { omit } from 'lodash-es';
import React, { useEffect, useMemo } from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

type Inputs = {
  title: string;
  message: string;
  attachment?: string;
  needSaveAsTpl?: boolean;
  needSendAll?: boolean;
  tplName?: string;
};

const defaultValues: Inputs = {
  title: '山有扶苏的祝福',
  message: '祝您生活愉快每一天~',
  attachment: '',
  needSaveAsTpl: false,
  needSendAll: false,
  tplName: '',
};

interface MailSendProps {
  gids: string[];
}

interface MailTpl {
  title: string;
  attach: string;
  deleteble?: true;
}

const getTotalTpl = () => {
  const history = window.localStorage.getItem('mail_tpl_history');

  let historyList: MailTpl[] = [];

  if (history) {
    historyList = JSON.parse(history).map((i: MailTpl) => ({
      ...i,
      deleteble: true,
    }));
  }

  return [...historyList, ...MAIL_ATTACH_INIT];
};

/**
 * 发送邮件
 * @param props
 * @returns
 */
export const SendMail = () => {
  const gids = useRoleStore((state) => state.selectedRoles.map((i) => i.gid));

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: defaultValues,
  });

  const needSaveAsTpl = useWatch({
    control,
    name: 'needSaveAsTpl',
  });

  const attachment = useWatch({
    control,
    name: 'attachment',
  });

  const [searchTxt, setSearchTxt] = React.useState('');

  const [totalTpl, setTotalTpl] = React.useState<MailTpl[]>([]);

  useEffect(() => {
    setTotalTpl(getTotalTpl());
  }, []);

  useEffect(() => {
    if (totalTpl.length === 0) {
      return;
    }
    window.localStorage.setItem(
      'mail_tpl_history',
      JSON.stringify(
        totalTpl.filter((i) => i.deleteble).map((i) => omit(i, ['deleteble']))
      )
    );
  }, [totalTpl]);

  const currentTpl = useMemo(() => {
    if (!searchTxt) {
      return totalTpl;
    }
    return totalTpl.filter(
      (i) => i.title.includes(searchTxt) || searchTxt.includes(i.title)
    );
  }, [totalTpl, searchTxt]);

  const [modalOpen, setModalOpen] = React.useState(false);

  const [selectedTpls, setSelectedTpls] = React.useState<React.Key[]>([]);

  const currentSelectTpl = useMemo(() => {
    if (!selectedTpls.length) {
      return [];
    }
    return totalTpl.filter((i) => selectedTpls.includes(i.title));
  }, [selectedTpls, totalTpl]);

  const allAttachment = useMemo(() => {
    const selectText = currentSelectTpl.map((i) => i.attach).join('');

    return selectText + (attachment || '');
  }, [attachment, currentSelectTpl]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!gids || gids.length < 1) {
      toast.error('请选择角色');
      return;
    }
    if (!allAttachment) {
      toast.error('请至少选择一个模板或填写自定义内容');
      return;
    }

    const { needSaveAsTpl, ...rest } = data;

    if (needSaveAsTpl) {
      setTotalTpl(
        produce(totalTpl, (draft) => {
          const tar = draft.find((i) => i.title === data.tplName);

          if (tar && !tar.deleteble) {
            return;
          }

          if (tar && tar.deleteble) {
            tar.attach = allAttachment;
            return;
          }

          draft.unshift({
            title: data.tplName as string,
            attach: allAttachment,
            deleteble: true,
          });
        })
      );
    }

    const reqData: SendMailApiReq = {
      ...rest,
      attachment: allAttachment,
      gids,
    };

    try {
      SendMailApiReq.parse(reqData);
      await axiosPost<never, SendMailApiReq>('/api/mail', reqData);
      toast.success('邮件发送成功');
    } catch (e) {
      console.error(e);
      toast.error(`邮件发送失败: ${(e as Error).message}`);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div className="flex flex-col gap-4">
        <h5>历史添加模板</h5>
        <div className="flex justify-between">
          <Input
            placeholder="模糊查询模板历史记录"
            value={searchTxt}
            onChange={(evt) => {
              setSearchTxt(evt.target.value);
            }}
          />
          <Button
            color="primary"
            variant="light"
            onClick={() => {
              setSelectedTpls([]);
            }}
          >
            清空所选
          </Button>
        </div>

        <ScrollShadow>
          <Listbox
            variant="flat"
            aria-label="历史模板选择"
            selectionMode="multiple"
            selectedKeys={selectedTpls as Iterable<string>}
            onSelectionChange={(keys) => {
              setSelectedTpls([...keys] as unknown as React.Key[]);
            }}
          >
            {currentTpl.map((item) => {
              return (
                <ListboxItem
                  key={item.title}
                  description={item.attach}
                  endContent={
                    <Button
                      isIconOnly
                      isDisabled={!item.deleteble}
                      size="sm"
                      onClick={(evt) => {
                        evt.stopPropagation();
                        setTotalTpl(
                          produce(totalTpl, (draft) => {
                            const tarIndex = draft.findIndex(
                              (i) => i.title === item.title
                            );
                            draft.splice(tarIndex, 1);
                          })
                        );
                      }}
                    >
                      <Icon icon="material-symbols:delete" width={22} />
                    </Button>
                  }
                >
                  {item.title}
                </ListboxItem>
              );
            })}
          </Listbox>
        </ScrollShadow>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <h5>邮件信息填写</h5>
        <div className="flex gap-4">
          <Controller
            name="needSaveAsTpl"
            control={control}
            render={({ field }) => (
              <Checkbox isSelected={field.value} onChange={field.onChange}>
                保存为模板
              </Checkbox>
            )}
          />
          <Controller
            name="needSendAll"
            control={control}
            render={({ field }) => (
              <Checkbox
                isSelected={field.value}
                isDisabled
                onValueChange={field.onChange}
              >
                全服发送
              </Checkbox>
            )}
          />
        </div>
        <Input
          label="邮件标题"
          isInvalid={!!errors['title']}
          errorMessage={errors['title']?.message}
          {...register('title', {
            required: true,
          })}
        />
        <Input
          label="附加标题"
          isInvalid={!!errors['message']}
          errorMessage={errors['message']?.message}
          {...register('message', {
            required: true,
          })}
        />
        <div className="flex flex-wrap gap-2">
          <div className="inline-block">已选择模板: </div>
          {currentSelectTpl.map((i) => (
            <Chip key={i.title} size="sm">
              {i.title}
            </Chip>
          ))}
        </div>
        <Textarea
          label="自定义发送内容"
          placeholder={`自定义发送内容会与模板选择的内容合并，当选中 "保存为模板" 时，也会合并保存到模板发送信息中`}
          isInvalid={!!errors['attachment']}
          errorMessage={errors['attachment']?.message}
          {...register('attachment', {
            validate(value) {
              if (!value) {
                return true;
              }

              const regex = /^#I.*#I$/; // 匹配以#I开头和结尾的字符串
              const count = (value.match(/#I/g) || []).length; // 计算#I的数量

              if (regex.test(value) && count % 2 === 0) {
                return true;
              }

              return '请检查自定义发送内容是否正确';
            },
          })}
        />

        {needSaveAsTpl && (
          <Input
            label="模板名称"
            placeholder="该名称作为唯一值，不可与之前添加的名称重复"
            isInvalid={!!errors['tplName']}
            errorMessage={errors['tplName']?.message}
            {...register('tplName', {
              required: needSaveAsTpl,
            })}
          />
        )}
        <Button
          onClick={() => {
            setModalOpen(true);
          }}
        >
          发送信息预览
        </Button>
        <Button
          type="submit"
          color="primary"
          isLoading={isSubmitting}
          isDisabled={gids.length === 0}
        >
          确认发送
        </Button>
      </form>
      <Modal
        backdrop="blur"
        placement="bottom"
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            邮件货物发送预览
          </ModalHeader>
          <ModalBody>
            {allAttachment
              .replace(/#I#I/g, '#I\n#I')
              .split('\n')
              .map((text, index) => (
                <Code key={`${text}${index}`}>{text}</Code>
              ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
