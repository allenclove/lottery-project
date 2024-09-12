<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <!-- 应用栏标题 -->
        <v-toolbar-title>抽奖分组管理</v-toolbar-title>

        <!-- 应用栏右侧操作按钮 -->

        <v-dialog v-model="dialog" persistent max-width="600">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn icon="mdi-plus-circle-outline" v-bind="activatorProps" @click="addGroup" variant="text"></v-btn>
          </template>

          <v-card prepend-icon="mdi-gift-outline" title="新增抽奖">
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="groupName" label="分组名称" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="groupDesc" label="备注"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>


            <v-card-actions>

              <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

              <v-btn color="primary" text="Save" variant="tonal" @click="saveGroup"></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app-bar>
      <v-main>
        <v-card class="mx-auto">
          <v-list>
            <template v-for="(group) in groups" :key="group.id">
              <v-list-item :title="group.name" @click="handleClick(group)">
                <template v-slot:append>
                  <v-btn @click.stop="showDeleteDialog(group, index)" color="grey-lighten-1" icon="mdi-close"
                    variant="text"></v-btn>
                </template>
                <!-- 可以根据需要添加更多内容或图标 -->
              </v-list-item>


            </template>
          </v-list>
        </v-card>
      </v-main>

    </v-layout>



  </v-card>
  <!-- 删除确认对话框 -->
  <!-- v-if="deleteDialogItem === group" -->
  <v-dialog v-model="deleteDialogVisible" max-width="400">
    <v-card>
      <v-card-title>确认删除</v-card-title>
      <v-card-text>您确定要删除“{{ deleteDialogItem.name }}”吗？</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="deleteDialogVisible = false">取消</v-btn>
        <v-btn color="error" text @click="handleDelete(deleteDialogItem)">删除</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-fab :key="activeFab.icon" :color="activeFab.color" :icon="activeFab.icon" class="me-4" location="bottom end"
    size="64" style="bottom: 30px;left: -22px;" @click.stop="back" absolute app appear></v-fab>
</template>

<script>
export default {
  data: () => ({
    deleteDialogVisible: false,
    groupName: null,
    groupDesc: null,
    groups: [],
    dialog: false,
    activeFab: { color: 'green', icon: 'mdi-chevron-up' },
  }),
  created() {
    this.loadFromLocalStorage()
  },
  methods: {
    back() {
      this.$router.push({ path: '/home' });
    },
    saveGroup() {
      console.log('groupName', this.groupName)
      console.log('groupDesc', this.groupDesc)
      this.groups.push({ name: this.groupName, id: this.groups.length, items: [] })
      this.saveToLocalStorage()
      this.dialog = false
    },
    addGroup() {
      this.groupName = null
      this.groupDesc = null
    },
    handleClick(group) {
      console.log(`Clicked on: ${group.title}`);
      // 假设 OptionManager 的路由名为 'optionManager'
      this.$router.push({ path: '/base/OptionManager', query: { groupId: group.id } });
    },
    showDeleteDialog(group) {
      this.deleteDialogItem = group;
      this.deleteDialogVisible = true;
    },
    handleDelete(group) {
      console.log('delete group', group)
      console.log('delete this.groups', this.groups)
      // 执行删除逻辑
      const index = this.groups.findIndex(i => i.id === group.id);
      if (index !== -1) {
        this.groups.splice(index, 1);
      }
      this.saveToLocalStorage();
      this.deleteDialogVisible = false;
    },
    // 存储到本地缓存
    saveToLocalStorage() {
      localStorage.setItem('prizeData', JSON.stringify(this.groups));
    },
    // 加载本地缓存数据
    loadFromLocalStorage() {
      try {
        const json = localStorage.getItem('prizeData')
        if (!json) {
          console.log('No data found in local storage.');
          return;
        }
        const data = JSON.parse(localStorage.getItem('prizeData'));

        console.log('Loaded data from local storage:', data);
        if (data) {
          console.log('Loaded data from local storage:', data);
          this.groups = data;
        }
      } catch (e) {
        console.error('Error loading local storage data:', e);
      }
    },
  },
}
</script>