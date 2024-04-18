/// <reference types="vite/client" />

declare module "*.vue" { //使用了ts 在引入文件时无法识别.vue后缀的文件，所以需要用此代码来解决bug
    import { App, defineComponent } from 'vue';
    const component: ReturnType<typeof defineComponent> & {
        install(app: App): void;
    };
    export default component
}