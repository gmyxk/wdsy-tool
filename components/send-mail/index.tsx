'use client';

import { SendMailItem } from '@/scheme';
import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import { CodeEditor } from '../code-editor';
import { SendTemplateActionRef, SendThingCommonProps } from '../send-common';
import { SendMailCustom } from './custom';
import { SendMailTemplate } from './template';

export function SendMail(props: SendThingCommonProps<SendMailItem>) {
  const actionRef = React.useRef<SendTemplateActionRef<SendMailItem>>();

  return (
    <Tabs size="sm" destroyInactiveTabPanel={false}>
      <Tab key="custom" title="自定义发放">
        <SendMailCustom
          onSaveTemplate={(data) => {
            actionRef.current?.saveToHistory(data);
          }}
          {...props}
        />
      </Tab>
      <Tab key="templates" title="模板发放">
        <SendMailTemplate actionRef={actionRef} {...props} />
      </Tab>
    </Tabs>
  );
}

export const SendMailDoc = ({ className }: { className?: string }) => {
  return (
    <CodeEditor
      title="模板参考"
      className={className}
      editorProps={{
        options: {
          minimap: { enabled: false },
          readOnly: true,
          // lineNumbers: 'off',
          // wordWrap: 'on',
          // renderLineHighlight: 'none',
          // lineDecorationsWidth: 0,
        },
        value: `#I金钱|金钱#r1000000000#I
#I代金券|代金券#r1000000000#I
#I金元宝|金元宝#r1000000000#I
#I银元宝|银元宝#r1000000000#I
#I经验|人物经验#r100000000#I
#I经验|宠物经验#r100000000#I
#I道行|道行#r99999#I
#I武学|武学#r99999#I
#I潜能|潜能#r2000000000#I
#I帮贡|帮贡#r9999999#I
#I阴德|阴德#r9999999#I
#I鬼气|鬼气#r9999999#I
#I声望|声望#r9999999#I
#I道法|道法#r9999999#I
#I器魂|器魂#r9999999#I
#I妖魂|妖魂#r9999999#I
#I灵尘|灵尘#r9999999#I
#I喜来通宝|喜来通宝#r50000#I
#I帮派活力值|帮派活力值#r100000#I
#I刷道积分|刷道积分#r100000#I
#I充值好礼|充值好礼抽取次数#r1000#I
#I首饰精华|首饰精华#r9800#I
#I帮派建设度|帮派建设度#r1000000#I
#I离线时间|离线时间#r999999#I

#I物品|冥海霞光#r2#I
#I物品|吉祥如意$100#r10#I
#I物品|金玉满堂$100#r10#I
#I物品|雷极弧光$13#r3#I

#I宠物|饮露(宝宝)$宠物等级$天技数量#I
#I宠物|阴阳师(鬼卒)$宠物等级$天技数量#I
#I宠物|范无救(鬼将)$宠物等级$天技数量#I
#I宠物|溜溜马(变异)$宠物等级$天技数量#I
#I宠物|九尾狐(神兽)$宠物等级$天技数量#I
#I宠物|太极熊(精怪)$宠物等级$天技数量#I
#I宠物|太极熊(御灵)$宠物等级$天技数量#I

#I2阶骑宠灵魄|2阶骑宠灵魄#r10#I

#I装备|赤眼神龙枪$130$color=(green)$upgradelevel=12$attribfull=5$suitpolar=5#I
#I装备|随机70级装备$70$color=(gold)#r5#I"
#I装备|金碧莲花$100$Type=weapon$color=(blue)$attribfull=5#r5#I
#I首饰|35级随机首饰$35%bind#r1#I

#I魂器|魂器·锋芒$魂器等级$slevel=魂器技能等级%bind#I
#I魂器|随机魂器=F$魂器等级$slevel=魂器技能等级%bind=限制交易时间秒数#r1#I

#I法宝|随机法宝=F$法宝等级$法宝相性1金5土6随机#I

#I法宝|法宝名字$法宝等级$法宝相性1金5土6随机$friendliness=亲密度$spskill=技能 1颠倒 2金刚圈 3物极 4天眼 5嘲讽 6亲密$spskillLV=技能等级$nimbus=灵气$exp=道法#I

#I时装|望月白%bind$Time=物品使用后持续天数$gender=性别1男2女auto自动#r1%deadline=限时回收秒数#I

#I飞行法宝|魔炎飞甲$nimbus=0-1是否起灵$Time=物品使用后持续天数%deadline=限时回收秒数#r1#I
#I飞行法宝|魔炎飞甲$nimbus=1$Time=30#r1#I

#I太阴之气|太阴之气$1蓝2粉3金#r1#I

#I称谓|称谓#r武当论道#I
#I称谓|称谓$称号限制时间秒数#r武当论道#I
#I称谓|称谓$7776000#r5周年·与道为伍$Auto=1$Type=wzn_zslb$#I
#I聊天头像框|五周年头像框%bind$Time=90#r1%deadline=1209600#I
#I聊天底框|五周年聊天底框%bind$Time=90%deadline=1209600#r1#I         
        `,
      }}
    />
  );
};
