'use client';

import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export const NoticeContent = () => {
  return (
    <>
      <p>
        本项目作者已不再更新，现项目代码已开源，有需要的自取，公共网站过段时间会关闭，感谢大家的使用，江湖再见~
        <Link href="https://github.com/liu245933567/wdsy-tool" showAnchorIcon>
          https://github.com/liu245933567/wdsy-tool
        </Link>
      </p>
      <p>山有扶苏在此声明:</p>
      <p>
        1.
        此工具是在下利用业余时间所写，旨在方便自己和大家对游戏数据进行操作管理，因业余时间有限，再者对游戏技术掌握不精，导致此应用之功能略少。如果此工具能略微帮助大家，小弟便深感荣幸。
      </p>
      <p>
        2.
        本人自打算开发此工具起，未曾想过利用此工具进行盈利。此工具不会通过任何渠道售卖，所有对此工具进行标价或进行有偿服务的人都是骗子，都是坏了良心的人，本人对此行为十分痛恨！！！希望大家发现有人通过本工具的信息差赚钱时能制止一下，感激不尽。
      </p>
      <p>3. 此工具没有后门，本人对各种下三滥的行为没兴趣</p>
      <p>
        4.
        有BUG或建议请联系本人唯一QQ:245933567；本人还是想把此工具做好的，有时间就更新；有React开发能力并且想帮一把的可以找我要源码。
      </p>
      <p>4. “君子爱财，取之有道” , 希望大家生活开心，感谢大家的使用, 谢谢。</p>
    </>
  );
};

export const BannerNotice = () => {
  const [isOpen, setOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const isAgreed = window.sessionStorage.getItem('NOTICE_HOME');
    if (isAgreed) {
      return;
    }
    setOpen(true);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      placement={isMobile ? 'bottom' : 'auto'}
      onOpenChange={setOpen}
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => {
          return (
            <>
              <ModalHeader className="flex flex-col gap-1">
                重要公告
              </ModalHeader>
              <ModalBody className="max-h-[calc(100vh-200px)] overflow-y-auto text-sm">
                <NoticeContent />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    window.sessionStorage.setItem('NOTICE_HOME', '1');
                    onClose();
                  }}
                >
                  我已知晓
                </Button>
              </ModalFooter>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
};
