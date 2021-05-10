<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <!-- el-radio 默认把 label 作为文本和选中之后的 value 值 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status" >
            <el-radio v-for="item in articleStatus" :key="item.status" :label="item.status">{{item.text}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="currentChannel" placeholder="请选择频道">
            <el-option label="全部" value="null"></el-option>
            <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
           <el-date-picker
            v-model="rangeDate"
            type="daterange"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <!-- button 按钮的 click 事件有个默认参数 -->
          <el-button type="primary" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据筛选表单 -->
    </el-card>
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到{{totalCount}}条结果：</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <!-- 数据列表
      Table表格组件
      1、把需要展示的数组列表数据帮顶给 table 组件的data 属性
      注意：不用 v-for 遍历，table组件会自动遍历
      2、设计表格列 el-table-column
      width 可以设定表格列的宽度
      label 可以设定表头的标题
      prop 用来设定要渲染的列表项数据字段
       -->
      <el-table
        :data="articles"
        style="width: 100%"
        stripe
        class="list-table"
        size='mini'
        v-loading="loading">
        <el-table-column
          prop="convert.images"
          label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="cover" class="article-cover" lazy></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="status">
          <!-- 如果炫耀在自定义列模板中获取当前遍历项数据，那么就在 template 上声明 slot-scope="scope" -->
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <!-- 如果需要自定义表格列模板，则把需要自定义的内容放到 template 里面 -->
          <template>
            <el-button
              size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button
              size="mini"
              type="danger" icon="el-icon-delete" circle></el-button>
      </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->

      <!-- 列表分页 -->
      <!-- total 用来设定总数据的条数
           它默认按照10条每页计算总页码 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :disabled="loading"
        @current-change="onCurrentChange"
        :page-size="pageSize">
      </el-pagination>
      <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import { getArticles, getChannels } from '@/api/article'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [], // 文章数据列表
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      totalCount: 0, // 总数据条数
      pageSize: 20, // 每页大小
      status: null, // 查询文章的状态，不传为全部
      channels: {}, // 频道列表
      currentChannel: null,
      rangeDate: null,
      loading: false
    }
  },
  created () {
    this.loadArticles(1)
    this.loadChannel()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
      this.loadArticles()
    },
    loadArticles (page = 1) {
      this.loading = true
      getArticles(
        {
          page,
          per_page: this.pageSize,
          status: this.status,
          channel_id: this.currentChannel,
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null
        }
      ).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.totalCount = totalCount
        this.articles = results
        this.loading = false
      })
    },
    loadChannel () {
      getChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    }
  }
}
</script>

<style>
.filter-card{
  margin-top: 30px;
}
.list-table{
  margin-bottom: 20px;
}
.article-cover{
  width: 100px;
  background-size: cover;
}
</style>
