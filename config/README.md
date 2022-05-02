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
  adminKey:
  restAPIKey:
  redirectURL:
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
