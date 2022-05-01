# default.yaml

```yaml
server:
  port:
jwt:
  secret:
  expiresIn:
bcrypt:
  rounds:
kakao:
  clientID:
  callbackURL:
typeorm:
  type:
  host:
  port:
  username:
  password:
```

# development.yaml

```yaml
typeorm:
  database:
  synchronize: true
```

# production.yaml

```yaml
typeorm:
  database:
  synchronize: false
```
