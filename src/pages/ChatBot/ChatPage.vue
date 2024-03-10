<template>
  <div>
    <header class="page-header">
      <div class="logo-container">
        <img
          src="../../assets/img/logo_transparent.png"
          alt="Logo"
          class="logo"
        />
        <span class="logo-text">云织非遗</span>
      </div>

      <button @click="login" class="login-button">立即登录</button>
    </header>
    <div class="chat-container">
      <!-- 左侧历史会话列表 -->
      <Sidebar @conversation-selected="handleConversationSelected" />

      <!-- 右侧聊天消息列表 -->
      <div class="message-list-container">
        <div
          class="message-list"
          :style="{ maxHeight: messageListHeight }"
          ref="messageList"
        >
          <div
            class="message"
            v-for="(message, index) in messages"
            :key="index"
          >
            <div v-if="message.type === 'user'" class="user-message">
              {{ message.text }}
            </div>
            <div v-else class="bot-message">{{ message.text }}</div>
          </div>
        </div>

        <!-- 消息输入框 -->
        <div class="input-container">
          <input
            type="text"
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="Type your message..."
          />
          <button class="send-button" @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../../components/Sidebar.vue";

export default {
  name: "ChatPage",
  data() {
    return {
      messages: [],
      newMessage: "",
      messageListHeight: "calc(100vh - 200px)", // 初始化为页面高度减去200像素的余量
    };
  },
  components: {
    Sidebar,
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({ type: "user", text: this.newMessage });
        // 在这里发送消息给机器人，并处理机器人的回复
        // 你可以调用后端接口或者其他方式来实现机器人对话的功能
        // 示例：假设机器人的回复是预先定义好的，可以直接添加到消息列表中
        this.messages.push({
          type: "bot",
          text: "This is a reply from the bot.",
        });
        // 清空输入框
        this.newMessage = "";
        // 滚动到消息列表底部
        this.$nextTick(() => {
          this.$refs.messageList.scrollTop =
            this.$refs.messageList.scrollHeight;
        });
      }
    },
    handleConversationSelected(conversation) {
      // 假设`messages`是你用来在模板中展示消息的数组
      // 现在将其更新为选中会话的消息数组
      this.messages = conversation.messages;
    },
    login() {},
    updateMessageListHeight() {
      const headerHeight = 40; // 头部导航栏高度
      const windowHeight = window.innerHeight;
      this.messageListHeight = `${windowHeight - headerHeight - 200}px`; // 减去200像素的余量
    },
  },
  mounted() {
    this.updateMessageListHeight();
    window.addEventListener("resize", this.updateMessageListHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateMessageListHeight);
  },
};
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  /* background-color: #007bff; */
  color: black;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 100px; /* 根据实际情况调整 */
  margin-right: 10px;
}

.logo-text {
  font-family: "楷体", cursive;
  font-size: 20px;
}

.chat-container {
  display: flex;
  max-width: 100%;
  height: 90vh;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.message-list-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20px; /* 左侧留出间距 */
}

.message-list {
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
}

.user-message {
  background-color: #e5f5fc;
  padding: 10px;
  border-radius: 5px;
}

.bot-message {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
}

.input-container {
  display: flex;
  align-items: center;
  margin-top: auto;
}

.input-container input {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.send-button {
  margin-left: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
