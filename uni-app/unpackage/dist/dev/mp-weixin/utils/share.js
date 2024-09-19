"use strict";
var utils_userEventTracking = require("./userEventTracking.js");
let shareAppImgUrlsByPengYouQuan = [];
let shareAppMessageByPengYouQuan = "\u9177\u72D7\u51FA\u884C";
let shareAppImgUrlsByUser = [];
let shareAppMessageByUser = "\u9177\u72D7\u51FA\u884C";
function sharePengYouQuan() {
  if (shareAppImgUrlsByPengYouQuan.length == 1) {
    return {
      title: shareAppMessageByPengYouQuan,
      desc: "",
      path: "/pages/home/home",
      imageUrl: shareAppImgUrlsByPengYouQuan[0].imgPath
    };
  }
  return {
    title: shareAppMessageByPengYouQuan,
    desc: "",
    path: "/pages/home/home"
  };
}
function shareUser() {
  if (shareAppImgUrlsByUser.length == 1) {
    return {
      title: shareAppMessageByUser,
      desc: "",
      path: "/pages/home/home",
      imageUrl: shareAppImgUrlsByUser[0].imgPath
    };
  }
  return {
    title: shareAppMessageByUser,
    desc: "",
    path: "/pages/home/home"
  };
}
var share = {
  onShareAppMessage() {
    utils_userEventTracking.userEventTracking({
      actionStr: `${utils_userEventTracking.getPageRouteTitle()}\u9875\u9762-\u5206\u4EAB\u5230\u4E2A\u4EBA`,
      actionType: "5"
    });
    return shareUser();
  },
  onShareTimeline() {
    utils_userEventTracking.userEventTracking({
      actionStr: `${utils_userEventTracking.getPageRouteTitle()}\u9875\u9762-\u5206\u4EAB\u5230\u670B\u53CB\u5708`,
      actionType: "5"
    });
    return sharePengYouQuan();
  }
};
exports.share = share;
