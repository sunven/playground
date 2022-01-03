<template>
  <div class="main-wrap">
    <div class="sidebar-wrap">
      <div class="info">打卡实际啊</div>
      <div class="menu">
        <ul>
          <li><i class="icon"></i><span>史蒂芬森啊1</span></li>
          <li><i class="icon"></i><span>史蒂芬森啊2</span></li>
          <li><i class="icon"></i><span>史蒂芬森啊3</span></li>
          <li><i class="icon"></i><span>史蒂芬森啊4</span></li>
        </ul>
      </div>
    </div>
    <div class="content-wrap">
      <div class="path-wrap">
        <div class="left">
          <i class="icon"></i>
          <span>发斯蒂芬</span>
          <i class="i-line"></i>
          <span>高度高度</span>
        </div>
        <div class="right">
          <div class="btn btn-primary">
            <span>设置</span>
          </div>
        </div>
      </div>
      <div class="project-wrap">
        <div class="operate">
          <div class="add">
            <div class="btn btn-primary">
              <span>新增</span>
            </div>
          </div>
          <div class="search">
            <div class="search-area">
              <input placeholder="请输入关键字进行过滤" class="ipt" />
              <i class="icon"></i>
            </div>
          </div>
        </div>
        <div class="list">
          <div class="item">
            <div class="tag"></div>
            <h4>WGS_人类抗疫</h4>
            <p>
              人类基因测序研究项目，有x主任主导人类基因测序研究项目有x主任主导人类基因测序研究项目，有x主任主导人类基因测序研究项目，有x主任主导人类基因测序研究项
            </p>
            <div class="more">
              <ul>
                <li><i class="icon"></i>导人类</li>
                <li><i class="icon"></i>导人类</li>
                <li><i class="icon"></i>导人类</li>
              </ul>
            </div>
            <div class="operate">
              <div>新增</div>
              <i class="i-line"></i>
              <div>新增</div>
              <i class="i-line"></i>
              <div>新增</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
html,
body,
div,
ul,
li,
p {
  margin: 0;
  padding: 0;
}
.icon {
  width: 16px;
  height: 16px;
  background-color: red;
  display: inline-block;
}
.i-line {
  width: 1px;
  display: inline-block;
  background-color: blue;
  height: 12px;
  margin: 0 10px;
}
.btn {
  padding: 4px 10px;
  span {
    color: white;
  }
}
.btn-primary {
  background-color: blue;
}
.ipt {
  height: 24px;
  width: 180px;
  border: none;
}

.main-wrap {
  display: flex;
  min-height: 100vh;

  .sidebar-wrap {
    background-color: black;
    color: #ffffff;
    width: 200px;

    .info {
      font-size: 20px;
      height: 60px;
      line-height: 60px;
    }
    .menu ul {
      list-style: none;

      li {
        text-align: left;
        padding-left: 10px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;

        &:hover {
          color: red;
        }
      }
    }
  }
  .content-wrap {
    flex-grow: 1;
    background-color: gainsboro;
    .path-wrap {
      height: 60px;
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 1px 0 0;

      .left {
        line-height: 60px;
        padding: 0 20px;
        span {
          margin: 0 10px;
        }
      }
      .right {
        padding: 0 20px;
      }
    }
    .project-wrap {
      .operate {
        padding: 8px 20px;
        display: flex;
        justify-content: space-between;
        .add {
        }
        .search-area {
          border: 1px solid grey;
          background-color: white;
        }
      }
      .list {
        padding: 8px 20px;
        .item {
          width: 500px;
          border: 1px solid white;
          padding: 8px 20px;
          background-color: white;
          box-shadow: 0 1px 0 0 white;
          h4,
          p {
            text-align: left;
          }
          .more {
            margin-top: 8px;
            ul {
              list-style: none;
              li {
                text-align: left;
                // padding-left: 14px;
              }
            }
          }
          .operate {
            margin-top: 8px;
            border-top: solid lightgray 1px;
            display: flex;
            div {
              text-align: center;
              flex-grow: 1;
            }
            i {
              display: block;
              height: 22px;
            }
          }
        }
      }
    }
  }
}
</style>
