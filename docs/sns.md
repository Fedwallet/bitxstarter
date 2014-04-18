# SNS Knowledge

* http://html5pattern.com/Names

### Username

#### BitXStarter

* username pattern:
  - 不支持下划线
  - 不能以中横线开头，可以结尾
  - ^[a-zA-Z0-9][a-zA-Z0-9-]{0,38}
  - maxleng: 39

#### GitHub

* username pattern:
  - 不支持下划线
  - 不能以中横线开头，可以结尾
  - ^[a-zA-Z0-9][a-z0-9-]{0,38}
  - maxleng: 39

#### Twitter

* username pattern:
  - ^[a-zA-Z0-9_]{1,15}$
  - maxleng: 15


#### Facebook

* username pattern: ^[a-z0-9.]{5,}$


#### Normal

* username pattern: [a-zA-Z0-9._-]+

### Avatar

#### BitXStarter

* avatar_url: custom avatar
* gravatar_id: email md5 hash

#### Gravatar

* https://cn.gravatar.com/site/implement/images/
* pattern
  - md5(trim(email))
  - http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50
