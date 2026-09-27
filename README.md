# Учебный проект

Опубликованный образ: [denchik117/js-layout-lab](https://hub.docker.com/r/denchik117/js-layout-lab), тег `latest`. Поддерживаются `linux/amd64` и `linux/arm64`.

Три страницы: главная со ссылками, пример CSS Grid и пример Flexbox.
Сайт работает в Docker через Nginx по HTTP и HTTPS.

## Запуск

```sh
cd /Users/denchik/Projects/js
docker build -t js-layout-lab:latest .
docker run --name js-layout-lab -d \
  -p 127.0.0.1:8080:80 -p 127.0.0.1:8443:443 \
  js-layout-lab:latest
```

Открыть [http://localhost:8080](http://localhost:8080) или [https://localhost:8443](https://localhost:8443).
Оба адреса работают независимо, без перенаправления.
В ссылках на страницы добавлено `?v=2`, чтобы браузер не использовал старое перенаправление из кэша.
Сертификат самоподписанный: браузер покажет предупреждение, для локальной проверки нужно разрешить переход.
Сертификат и приватный ключ создаются при запуске контейнера и не входят в образ.

Остановить и снова запустить:

```sh
docker stop js-layout-lab
docker start js-layout-lab
```

## Повторная публикация в Docker Hub

Публичный репозиторий уже создан. Для загрузки обновлённого локального образа выполнить:

```sh
docker login
docker tag js-layout-lab:latest denchik117/js-layout-lab:latest
docker push denchik117/js-layout-lab:latest
```

Ссылка для отчёта:

```text
https://hub.docker.com/r/denchik117/js-layout-lab
```

## Обновление образа для Apple Silicon и Intel/AMD

Вместо обычного `tag`/`push` после `docker login` выполнить из папки проекта.
Builder `js-layout-builder` уже создан. На другом компьютере сначала создать его командой `docker buildx create --name js-layout-builder --driver docker-container`.

```sh
docker buildx build --builder js-layout-builder \
  --platform linux/amd64,linux/arm64 \
  -t denchik117/js-layout-lab:latest --push .
```

[Документация Docker: публикация](https://docs.docker.com/docker-hub/repos/manage/hub-images/push/) · [мультиплатформенная сборка](https://docs.docker.com/build/building/multi-platform/).
