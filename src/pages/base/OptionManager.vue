<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <!-- 应用栏标题 -->
        <v-toolbar-title>{{ groupName }}</v-toolbar-title>

        <!-- 应用栏右侧操作按钮 -->
        <v-dialog v-model="dialog" persistent max-width="600">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn icon="mdi-plus-circle-outline" v-bind="activatorProps" @click="addOption" variant="text"></v-btn>
          </template>

          <v-card prepend-icon="mdi-gift-outline" title="新增抽奖项">
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="optionName" label="奖项名称" required></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
              <v-btn color="primary" text="Save" variant="tonal" @click="saveOption"></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app-bar>
      <v-main>
        <v-card class="mx-auto">
          <v-list>
            <template v-for="(item, index) in options" :key="item.id">
              <v-list-item :title="item.name" @click="handleClick(item)">
                <!-- 可以根据需要添加更多内容或图标 -->
                <template v-slot:append>
                  <v-btn @click.stop="showDeleteDialog(item, index)" color="grey-lighten-1" icon="mdi-close"
                    variant="text"></v-btn>
                </template>
              </v-list-item>


            </template>
          </v-list>
        </v-card>
      </v-main>
    </v-layout>
  </v-card>
  <!-- 删除确认对话框 -->
  <v-dialog v-model="deleteDialogVisible" max-width="400">
    <v-card>
      {{ deleteDialogItem }}
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
    optionName: null,
    dialog: false,
    groupName: null,
    groupId: null,
    activeFab: { color: 'green', icon: 'mdi-chevron-up' },
    groups: []
  }),

  created() {
    this.groupId = parseInt(this.$route.query.groupId);
    this.loadOptionsFromLocalStorage();
  },

  methods: {
    back() {
      this.$router.push({ path: '/base/GroupManager' });
    },
    saveOption() {
      if (this.optionName) {
        const newOption = { id: this.options.length + 1, name: this.optionName };
        this.options.push(newOption);
        this.saveOptionsToLocalStorage();
        this.dialog = false;
      } else {
        alert('请输入奖项名称');
      }
    },

    addOption() {
      this.optionName = null;
    },

    handleClick(item) {
      console.log(`Clicked on: ${item.name}`);
    },

    showDeleteDialog(item, index) {
      this.deleteDialogItem = item;
      this.deleteDialogIndex = index;
      this.deleteDialogVisible = true;
    },

    handleDelete(item) {
      console.log('delete item', item)
      console.log('delete this.options', this.options)
      const index = this.options.findIndex(i => i.id === item.id);
      if (index !== -1) {
        this.options.splice(index, 1);
      }
      this.saveOptionsToLocalStorage();
      this.deleteDialogVisible = false;
    },

    // 存储到本地缓存
    saveOptionsToLocalStorage() {
      const groupIndex = this.groups.findIndex(g => g.id === this.groupId);
      if (groupIndex !== -1) {
        this.groups[groupIndex].items = this.options;
        localStorage.setItem('prizeData', JSON.stringify(this.groups));
      }
    },

    // 加载本地缓存数据
    loadOptionsFromLocalStorage() {
      try {
        const json = localStorage.getItem('prizeData');
        if (!json) {
          console.log('No data found in local storage.');
          return;
        } 4
        const data = JSON.parse(json);

        console.log('Loaded data from local storage:', data);
        if (data) {
          this.groups = data; // 直接将解析后的数据赋值给 groups
          const group = this.groups.find(g => g.id === this.groupId);
          if (group) {
            this.groupName = group.name;
            this.options = group.items || [];
          }
        }
      } catch (e) {
        console.error('Error loading local storage data:', e);
      }
    },
  },
}
</script>