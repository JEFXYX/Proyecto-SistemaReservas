FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
# Copiar configuración de Nginx si fuese necesario, pero por defecto nginx sirve los estáticos.
# Importante: Para aplicaciones React (SPA), necesitamos redirigir todo a index.html.
# Para evitar crear un nginx.conf, podemos usar un truco o simplemente crear uno.
# Vamos a crear el archivo por defecto de nginx pero que maneje bien React Router.
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
# Reemplazamos la configuración de Nginx para soportar React Router (SPA)
RUN printf 'server {\n\
    listen 80;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html index.htm;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
