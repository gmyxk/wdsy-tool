import {
  deleteContainerPetInfoRequest,
  getContainerPetsRequest,
  putContainerPetInfoRequest,
} from '@/api-request';
import { ControllerInput } from '@/components';
import { EditPetInfoPayload } from '@/scheme';
import { cn } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
} from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { pick } from 'lodash-es';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CellValue } from '../info/info-card';

const PetItem = ({
  gid,
  info,
  positionId,
  onSuccess,
}: {
  gid: string;
  info: API.PetInfo;
  positionId: number;
  onSuccess: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const { control, handleSubmit, reset } = useForm<EditPetInfoPayload>({
    resolver: zodResolver(EditPetInfoPayload),
  });

  useEffect(() => {
    if (info) {
      reset(pick(info, ['level', 'wuxue']));
    }
  }, [info, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteContainerPetInfoRequest,
    onSuccess: () => {
      setOpen(false);
      toast.success('删除成功');
      onSuccess();
    },
    onError: () => {
      toast.error('删除失败');
    },
  });

  const onSubmit: SubmitHandler<EditPetInfoPayload> = async (data) => {
    try {
      await putContainerPetInfoRequest({
        gid,
        positionId,
        payload: data,
      });
      toast.success('修改成功');
      onSuccess();
    } catch (error) {
      toast.error((error as Error).message || '修改失败');
    }
  };

  const [open, setOpen] = useState(false);

  const name = info.name.replace(/_[0-9]_[0-9]/g, '');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className="flex justify-between pb-0">
          <div className="font-semibold">{name}</div>
          <div>
            <Button
              size="sm"
              isIconOnly
              variant="light"
              onClick={() => {
                setOpen(true);
              }}
            >
              <Icon icon="mdi:eye" width={20} />
            </Button>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-2 py-0">
          <CellValue
            label="等级"
            value={`Lv.${info.level}`}
            isEditing={isEditing}
            editorRender={() => (
              <ControllerInput
                control={control}
                name="level"
                aria-labelledby="等级"
                size="sm"
                type="number"
                className="w-40"
              />
            )}
          />
          <CellValue
            label="武学"
            value={info.wuxue}
            isEditing={isEditing}
            editorRender={() => (
              <ControllerInput
                control={control}
                name="wuxue"
                aria-labelledby="武学"
                size="sm"
                type="number"
                className="w-40"
              />
            )}
          />
        </CardBody>
        <CardFooter className="flex gap-2">
          <Button
            size="sm"
            onPress={() => {
              setIsEditing(!isEditing);
            }}
            className={cn({
              'flex-grow': !isEditing,
            })}
            // startContent={<Icon icon="uil:edit" width={20} />}
            {...(isEditing
              ? {
                  color: 'danger',
                  variant: 'bordered',
                }
              : {
                  // color: 'primary',
                })}
          >
            {isEditing ? '取消' : '编辑'}
          </Button>
          <Button
            className={cn('hidden flex-grow', isEditing && 'block')}
            size="sm"
            type="submit"
            color="primary"
          >
            确认修改
          </Button>
        </CardFooter>
      </Card>
      <Modal
        // size="sm"
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{info.name}</ModalHeader>
          <ModalBody>
            <pre className="max-h-[48vh] overflow-y-auto">
              {JSON.stringify(info.payload, null, 2)}
            </pre>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              isLoading={isPending}
              onClick={() => {
                mutate({
                  gid,
                  positionId,
                });
              }}
            >
              删除
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
};

export const ContainerPetList = ({ gid }: { gid: string }) => {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['container-pet-info', gid],
    queryFn: ({ queryKey }) => getContainerPetsRequest(queryKey[1]),
  });

  if (isPending) {
    return <Skeleton className="h-16 w-full rounded-lg" />;
  }

  if (!data?.data || data.data.pets.length === 0) {
    return <div className="text-center">没有宠物~</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {data.data.pets.map((pet) => (
        <PetItem
          key={pet.positionId}
          info={pet}
          onSuccess={refetch}
          gid={gid}
          positionId={pet.positionId}
        />
      ))}
    </div>
  );
};
