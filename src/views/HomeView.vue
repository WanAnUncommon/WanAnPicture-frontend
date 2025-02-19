<template>
  <div id="homeView">
    <div class="search-bar">
      <a-input-search
          v-model:value="searchParams.searchText"
          placeholder="从海量图片中搜索"
          enter-button="搜索"
          size="large"
          @search="doSearch"
      />
    </div>
    <a-tabs v-model:active-key="selectedCategory" @change="doSearch">
      <a-tab-pane key="all" tab="全部"/>
      <a-tab-pane v-for="category in categoryList" :tab="category" :key="category"/>
    </a-tabs>
    <div class="tag-bar">
      <span style="margin-right: 8px">标签:</span>
      <a-space :size="[0, 8]" wrap>
        <a-checkable-tag
            v-for="(tag, index) in tagList"
            :key="tag"
            v-model:checked="selectedTagList[index]"
            @change="doSearch"
        >
          {{ tag }}
        </a-checkable-tag>
      </a-space>
    </div>
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
      :data-source="dataList"
      :pagination="pagination"
      :loading="loading"
    >
      <template #renderItem="{ item: picture }">
        <a-list-item style="padding: 0">
          <a-card hoverable @click="doPictureClick(picture)">
            <template #cover>
              <img
                :alt="picture.name"
                :src="picture.thumbnailUrl ?? picture.url"
                style="height: 180px; object-fit: cover"
              />
            </template>
            <a-card-meta :title="picture.name">
              <template #description>
                <a-flex>
                  <a-tag color="green">{{ picture.category ?? '默认分类' }}</a-tag>
                  <a-tag v-for="tag in picture.tags" :key="tag">{{ tag }}</a-tag>
                </a-flex>
              </template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import {getTagCategoryUsingGet, listPictureVoByPageUsingPost} from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import {useRouter} from "vue-router";

const dataList = ref<API.PictureVO[]>([])

const total = ref(0)
const searchParams = reactive<API.PictureQueryRequest>({
  currentPage: 1,
  pageSize: 10,
})
const pagination = computed(() => {
  return {
    current: searchParams.currentPage,
    pageSize: searchParams.pageSize,
    total: total.value,
    showQuickJumper: true,
    onChange: (page: number, pageSize: number) => {
      searchParams.currentPage = page
      searchParams.pageSize = pageSize
      fetchData()
    },
  }
})

const loading=ref(true)
const fetchData = async () => {
  loading.value=true;
  const params={ ...searchParams,tags:[] as string[] };
  if (selectedCategory.value !== 'all'){
    params.category=selectedCategory.value;
  }
  selectedTagList.value.forEach((checked, index) => {
    if (checked) {
      params.tags.push(tagList.value[index])
    }
  })
  const res = await listPictureVoByPageUsingPost(params)
  if (res.data.code === 200&&res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  } else {
    message.error('获取数据失败：' + res.data.message)
  }
  loading.value=false;
}

const doSearch = () => {
  searchParams.currentPage = 1
  fetchData()
}

// 页面加载时请求数据
onMounted(() => {
  fetchData()
})


const tagList = ref<string[]>([])
const categoryList = ref<string[]>([])
const selectedCategory = ref<string>('all')
const selectedTagList = ref<boolean[]>([])
/**
 * 获取标签、分类选项
 */
const getTagCategoryOptions = async () => {
  const res = await getTagCategoryUsingGet()
  if (res.data.code === 200 && res.data.data) {
    tagList.value = res.data.data.tagList ?? []
    categoryList.value = res.data.data.categoryList ?? []
  } else {
    message.error('失败:' + res.data.message)
  }
}

onMounted(() => {
  getTagCategoryOptions()
})

const router=useRouter();
const doPictureClick=(picture:API.PictureVO)=>{
  router.push({
    path: `/picture/${picture.id}`,
  })
}
</script>
<style scoped>
#homeView .search-bar{
  max-width: 480px;
  margin: 0 auto 16px;
}
#homeView .tag-bar{
  margin-bottom: 16px;
}
</style>
