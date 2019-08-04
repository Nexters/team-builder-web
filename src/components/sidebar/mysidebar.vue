<template>
    <div>
        <sidebar-menu
                :menu="menu"
                :collapsed="collapsed"
                :theme="selectedTheme"
                :width="width"
                @item-click="onItemClick">
        </sidebar-menu>
    </div>
</template>

<script>
    const separator = {
        template: `<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">`
    };

    export default {
        name: 'mysidebar',
        data() {
            return {
                classData: {},
                menu: [
                    {
                        header: true,
                        title: 'Main Navigation'
                    },
                    {
                        href: '/home',
                        title: 'dashboard',
                        icon: 'fas fa-home'
                    },
                    {
                        header: true,
                        component: separator,
                        visibleOnCollapse: true
                    },
                    {
                        header: true,
                        title: 'Option'
                    },
                    {
                        href: '/signup',
                        title: 'signup',
                        icon: 'fas fa-user-plus'
                    },
                    {
                        href: '/login',
                        title: 'login',
                        icon: 'fas fa-sign-in-alt'
                    },
                    {
                        href: '/info',
                        title: 'info',
                        icon: 'fas fa-exchange-alt'
                    }
                ],
                collapsed: true,
                themes: ['', 'white-theme'],
                selectedTheme: 'white-theme',
                width: '200px'
            }
        },
        methods: {
            classSet() {
                this.classData = {
                    title: '기수 선택',
                    icon: {
                        element: 'span',
                        attributes: {},
                        text: 'CA'
                    },
                    child: []
                }
            },
            classChildSet() {
                this.classData.child.push({
                    href: '/loginSuccess',
                    title: '15기',
                    kind: 'class-child',
                    text: '15',
                    icon: {
                        element: 'span',
                        attributes: {}
                    }
                });
                this.classData.child.push({
                    href: '/loginSuccess2',
                    title: '16기',
                    kind: 'class-child',
                    text: '16',
                    icon: {
                        element: 'span',
                        attributes: {}
                    }
                })
            },
            onItemClick(event, item) {
                if (item.kind === 'class-child') {
                    this.classData.icon.text = item.text
                } else {
                    this.classData.icon.text = 'CA'
                }
            }
        },
        beforeMount() {
            this.classSet();
            this.classChildSet();
            this.menu.push(this.classData)
        }
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');
    @import "../../../static/sidebar/src/scss/vue-sidebar-menu.scss";
    @import "../../../static/sidebar/src/scss/var.scss";
    @import "../../../static/sidebar/src/scss/themes/default-theme.scss";
    @import "../../../static/sidebar/src/scss/themes/white-theme.scss";

    .fa-icon-innter-text {
        font-family: 'sans-serif';
        font-size: 3rem;
        margin: 0;
        text-align: center;
    }
    .vsm-icon {
        font-weight: bold;
    }
</style>
