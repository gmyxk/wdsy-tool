## data

```sql
CREATE TABLE `data` (
  `path` varchar(128) NOT NULL DEFAULT '',
  `name` varchar(128) NOT NULL DEFAULT '',
  `branch` varchar(128) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `time` varchar(14) NOT NULL DEFAULT '',
  `checksum` int(32) NOT NULL DEFAULT '0',
  `memo` text,
  PRIMARY KEY (`path`,`name`,`branch`) USING BTREE,
  KEY `name_path` (`name`,`path`) USING BTREE,
  KEY `path_time` (`path`,`time`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;
```

> 记录在线状态

path = runtime

content 

```txt
(["create_time":"2024-08-08-09:37:38","active_char":"为我痴狂","startup_id":1722700284,"game_server":"官方问道6线","locked_gid":"66AA289C8D628D0001F9","time":1723081058,"user_cache_uid":"66B4216275C926000106",])
```

```txt
([
    "create_time": "2024-08-08-09: 37: 38",
    "active_char": "为我痴狂",
    "startup_id": 1722700284,
    "game_server": "官方问道6线",
    "locked_gid": "66AA289C8D628D0001F9",
    "time": 1723081058,
    "user_cache_uid": "66B4216275C926000106",
])
```