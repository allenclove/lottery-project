<template>
    <v-card style="height: 100%;">
        <v-layout style="height: 100%;">
            <v-app-bar color="primary" prominent>
                <!-- 应用栏标题 -->
                <v-toolbar-title>抽了么</v-toolbar-title>

                <!-- 应用栏右侧操作按钮 -->
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                    </template>

                    <v-list>
                        <v-list-item v-for="(item, i) in items" :key="i">
                            <v-list-item-title @click="handleClick(item)">{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-app-bar>
            <v-main>
                <div class="ma-6">
                    <v-select label="Select" :items="selectGroups" item-title="name" item-value="id" v-model="groupId"
                        @update:modelValue="changeGroup" variant="outlined"></v-select>
                </div>
                <v-container class="justify-center" fluid>
                        <div class="justify-center">
                            <MyLuckyWheel :groupId="groupId" />
                        </div>
                    </v-row>
                </v-container>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
import MyLuckyWheel from '@/components/MyLuckyWheel.vue';

export default {
    components: {
        MyLuckyWheel
    },
    data() {
        return {
            groupId: 0,
            items: [
                { id: 3, title: '抽奖分组管理' },
            ],
            selectGroups: [],
            groups: []
        };
    },
    created() {
        if (this.$route.query.groupId) {
            this.groupId = this.$route.query.groupId;
        }
        this.loadOptionsFromLocalStorage();
    },
    methods: {
        loadOptionsFromLocalStorage() {
            try {
                const json = localStorage.getItem('prizeData');
                if (!json) {
                    console.log('No data found in local storage.');
                    return;
                }
                const data = JSON.parse(json);

                console.log('Loaded data from local storage:', data);
                if (data) {
                    this.groups = data; // 直接将解析后的数据赋值给 groups
                    this.selectGroups = data.map(group => ({ id: group.id, name: group.name }));
                    const group = this.groups.find(g => g.id === this.groupId);
                    if (group) {
                        this.groupId = group.id;
                    }
                }
            } catch (e) {
                console.error('Error loading local storage data:', e);
            }
        },
        handleClick(item) {
            if (item.id === 1111) {
                // 选择抽奖组
            } else if (item.id === 2222) {
                // 选择抽奖盘
            } else {
                // 抽奖分组管理
                this.$router.push({ path: '/base/GroupManager' });
            }
        },
        changeGroup(newGroupId) {
            console.log('groupId changed to:', newGroupId);
            this.groupId = newGroupId;
            this.loadOptionsFromLocalStorage(newGroupId);
        }
    }
};
</script>