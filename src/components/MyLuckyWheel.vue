<template>
    <!-- 大转盘 -->
    <LuckyWheel v-if="width" ref="myLucky" :width="width" :height="height" :prizes="prizes" :blocks="blocks"
        :buttons="buttons" @start="startCallback" @end="endCallback" />
</template>

<script>
export default {
    name: 'MyLuckyWheel',
    props: {
        groupId: Number,
    },
    data() {
        return {
            blocks: [{ padding: '13px', background: '#617df2' }],
            prizes: [],
            buttons: [{
                radius: '35%',
                background: '#8a9bf3',
                pointer: true,
                fonts: [{ text: '开始', top: '-10px' }]
            }],
            width: 0,
            height: 0,
        }
    },
    created() {
        this.loadPrizes();
    },
    watch: {
        groupId(newGroupId) {
            console.log('groupId changed to:', newGroupId);
            this.loadPrizes();
        }
    },
    mounted() {
        this.height = this.width = document.body.clientWidth / 1.4
        console.log('mounted width', this.width)

    },
    methods: {
        // 点击抽奖按钮会触发start回调
        startCallback() {
            // 调用抽奖组件的play方法开始游戏
            this.$refs.myLucky.play()
            // 模拟调用接口异步抽奖
            setTimeout(() => {
                // 生成一个随机索引
                const index = Math.floor(Math.random() * this.prizes.length);
                // 调用stop停止旋转并传递中奖索引
                this.$refs.myLucky.stop(index)
            }, 3000)
        },
        // 抽奖结束会触发end回调
        endCallback(prize) {
            console.log(prize)
        },
        loadPrizes() {
            // 从本地缓存中读取 JSON 数据
            const cachedData = localStorage.getItem('prizeData');
            if (cachedData) {
                const localData = JSON.parse(cachedData);
                // 根据 groupId 查找对应的奖项
                const group = localData.find(group => group.id === this.groupId);
                if (group) {
                    // 将找到的奖项转换成指定格式并添加到 prizes 数组中
                    this.prizes = group.items.map(item => ({
                        fonts: [{ text: item.name, top: '10%' }],
                        background: '#b8c5f2'
                    }));
                } else {
                    console.log('未找到对应的分组');
                }
            } else {
                console.log('本地缓存中没有数据');
            }
        }
    }
}
</script>

<style></style>