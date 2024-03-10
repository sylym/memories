<template>
  <div class="sidebar">
    <!-- Conversation history navigation -->
    <div class="conversation-history">
      <!-- Search input -->
      <input
        class="search-input"
        type="text"
        v-model="searchQuery"
        placeholder="搜索历史记录"
      />

      <!-- Buttons -->
      <div class="button-group">
        <!-- New conversation button -->
        <button class="new-conversation-btn" @click="createNewConversation">
          枫香染图片生成
        </button>
        <!-- Placeholder button -->
        <button class="placeholder-btn" @click="createNewConversation">
          建立新对话
        </button>
      </div>
      <ul class="history-list">
        <!-- Display filtered conversations as list items -->
        <li
          class="history-item"
          :class="{ selected: index === selectedIndex }"
          v-for="(conversation, index) in filteredConversations"
          :key="index"
          @click="selectConversation(conversation)"
        >
          <div>
            <img
              src="../assets/img/conversation.svg"
              alt="Conversation Icon"
              class="icon"
            />
            {{ conversation.title }}
          </div>

          <button class="delete-btn" @click.stop="deleteConversation(index)">
            删除
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      conversations: [
        {
          title: "conversation1",
          content: "对话内容1",
          messages: [],
        },
        {
          title: "conversation2",
          content: "对话内容2",
          messages: [],
        },
        { title: "conversation3", content: "对话内容3", messages: [] },
        // 其他会话
      ],
      searchQuery: "", // 搜索关键词
      selectedConversation: null, // 选中的会话
      selectedIndex: null,
    };
  },
  computed: {
    // 根据搜索关键词过滤会话列表
    filteredConversations() {
      return this.conversations.filter((conversation) => {
        return conversation.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
  },
  methods: {
    // 选中会话
    selectConversation(conversation) {
      const index = this.conversations.indexOf(conversation);
      this.selectedIndex = index; // 记录选中的会话索引
      this.selectedConversation = conversation; // 更新选中的会话对象
      this.$emit("conversation-selected", conversation);
    },
    // 创建新会话
    createNewConversation() {
      // 请求用户输入新会话的标题
      const title = prompt("请输入新会话的标题:");
      if (title) {
        // 创建新的会话对象
        const newConversation = { title: title, content: "", messages: [] }; // 添加 content 属性
        // 将新的会话对象添加到会话列表中
        this.conversations.push(newConversation);
        // 选中新创建的会话
        this.selectConversation(newConversation);
        console.log("创建新会话:", title);
      }
    },
    deleteConversation(index) {
      // 从会话列表中删除指定的会话
      this.conversations.splice(index, 1);
      console.log("会话已删除");
    },
  },
};
</script>

<style scoped>
/* Styles for the sidebar */
.sidebar {
  width: 300px;
  padding: 20px;
  background-color: #f0f0f0;
}

.conversation-history {
  margin-bottom: 20px;
}

.history-list {
  list-style-type: none;
  padding: 0;
}

.history-item {
  cursor: pointer;
  padding: 10px;
  background-color: #e0e0e0;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.history-item:hover {
  background-color: #d0d0d0;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.new-conversation-btn,
.placeholder-btn {
  width: calc(50% - 5px); /* 计算按钮宽度，留出间距 */
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.new-conversation-btn {
  background-color: #007bff;
  color: white;
}

.placeholder-btn {
  background-color: #ccc;
  color: white;
}

.search-input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box; /* 让内边距和边框包含在宽度内 */
  border-radius: 5px;
  border: 1px solid #ccc;
}

.icon {
  height: 20px; /* 设置图标的高度 */
  margin-right: 10px; /* 添加图标与文本之间的间距 */
}

.selected {
  background-color: #007bff; /* 或者其他明显的颜色 */
  color: white; /* 改变文字颜色以提高可读性 */
}
</style>
