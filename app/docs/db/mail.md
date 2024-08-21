## mail

```sql
CREATE TABLE `mail` (
  `id` varchar(32) NOT NULL,
  `sender` varchar(32) NOT NULL,
  `to_gid` varchar(32) NOT NULL,
  `status` int(4) NOT NULL,
  `title` varchar(64) NOT NULL,
  `type` int(4) NOT NULL,
  `log_type` tinyint(4) NOT NULL,
  `create_time` int(11) DEFAULT NULL,
  `expired_time` int(11) DEFAULT NULL,
  `attachment` text NOT NULL,
  `fetch_mark` varchar(64) NOT NULL,
  `misc` text NOT NULL,
  `checksum` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `index_type_log_type_expired_time` (`type`,`log_type`,`expired_time`) USING BTREE,
  KEY `index_to_gid_type_status_expired_time_fetch_mark` (`to_gid`,`type`,`status`,`expired_time`,`fetch_mark`) USING BTREE,
  KEY `index_type_expired_time` (`type`,`expired_time`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;
```

misc

```txt
(["del_time":1722646222,"fetch_mark":"1_tservice21","log_type":0,"fetch_time":1722185532,"message":"大唐盛世新人上线福利，请查收","read_time":1722185530,"para":([]),])
```

```txt
([
    "del_time": 1722646222,
    "fetch_mark": "1_tservice21",
    "log_type": 0,
    "fetch_time": 1722185532,
    "message": "大唐盛世新人上线福利，请查收",
    "read_time": 1722185530,
    "para": ([
    ]),
])
```
