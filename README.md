# Разработка на JavaScript

Репозиторий для лабораторных работ по JavaScript.
Ссылка на образ: [denchik117/js-layout-lab](https://hub.docker.com/r/denchik117/js-layout-lab).

## Информация

- **Студент:** Загвоздин Денис Сергеевич
- **Группа:** РИМ-250950

## Лабораторные работы

1. [Лабораторная работа №1](https://docs.google.com/document/d/1NWTc0CBfaGmVj5UaupJwKcSGLBEUzfD7ZdCmqM5iDCY/edit?usp=sharing)
2. [Лабораторная работа №2](https://docs.google.com/document/d/1B07h5v5yDTu4oqoY2fbCs1EwZNip4_1ReM9uffZI-Lw/edit?usp=sharing)
3. [Лабораторная работа №3](https://docs.google.com/document/d/1wx54ZdTEXXL6ZbeOds6emFof0S0LsDKgME2ZwDnow3I/edit?usp=sharing)
4. [Лабораторная работа №4](https://docs.google.com/document/d/1O9OSJTeAHLSdjgwxKQ4jtMflrKRRHfJX0Vx984lZYZE/edit?usp=sharing)

## Сборка

Нужен Node.js 24+. Фронт собирается локально, Docker копирует готовую папку `dist/`.

```sh
npm ci
npm run build
docker build -t js-layout-lab:latest .
```

После изменения исходников повторить сборку фронта, образа и пересоздать контейнер.
