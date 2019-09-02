import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        categoryKey: '0',
        categories: [
            {
                name: '全部',
                key: '0'
            },
            {
                name: '待付款',
                key: '1'
            },
            {
                name: '待收货',
                key: '3'
            },
            {
                name: '已完成',
                key: '4'
            },
            {
                name: '售后',
                key: '5'
            }
        ],
        slideData: [],
        topList: [],
        moreList: [],
        merchantId: 50
    },
    getters: {
        categoryKey(state) {
            return state.categoryKey;
        },
        categories(state) {
            return state.categories;
        },
        slideData(state) {
            return state.slideData;
        },
        topList(state) {
            return state.topList;
        },
        moreList(state) {
            return state.moreList;
        },
        getMerchantId(state) {
            return state.merchantId;
        }
    },
    mutations: {
        updateSlideData(state, data) {
            state.slideData = data;
        },
        updateTopList(state, data) {
            state.topList = data;
        },
        updateMoreList(state, data) {
            state.moreList = state.moreList.concat(data);
        },
        updateMerchantId(state ,data) {
            console.log(data)
            state.merchantId = data;
        },
    },
    actions: {
        getTopList(store) {
            // Vue.jsonp('http://3g.163.com/touch/jsonp/sy/recommend/0-9.html').then( data => {
            //     // console.log(data);
            //     if (data.code == 200) {
            //         let slideData = data.focus.filter( item => {
            //             return item.addata == null;
            //         } ).map( item => {
            //             return {
            //                 title: item.title,
            //                 img: item.picInfo[0].url,
            //                 url: item.link
            //             }
            //         } );

            //         let topList = data.list.filter( item => {
            //             return item.addata == null;
            //         } ).map( item => {
            //             return {
            //                 title: item.title,
            //                 src: item.picInfo[0].url,
            //                 desc: item.category
            //             }
            //         } );

            //         store.commit('updateSlideData', slideData);
            //         store.commit('updateTopList', topList);
            //     }
            // } );
        },

        refreshTopList(store, {refreshKey}) {
            // return Vue.jsonp('http://3g.163.com/touch/jsonp/sy/recommend/0-9.html', {
            //     miss: '00',
            //     refresh: refreshKey
            // })
            // .then( data => {
            //     let topList = data.list.filter( item => {
            //         return item.addata == null;
            //     } ).map( item => {
            //         return {
            //             title: item.title,
            //             src: item.picInfo[0].url,
            //             desc: item.category
            //         }
            //     } );

            //     store.commit('updateTopList', topList);

            //     return Promise.resolve(topList.length);
            // } )
        },

        loadMoreList(store, {refreshKey, page, prepage}) {
            let start = page*prepage;
            let end = start + prepage;
            return Vue.jsonp(`http://3g.163.com/touch/jsonp/sy/recommend/${start}-${end}.html`, {
                miss: '00',
                refresh: refreshKey
            })
            .then( data => {
                let moreList = data.list.filter( item => {
                    return item.addata == null && item.picInfo.length;
                } ).map( item => {
                    return {
                        title: item.title,
                        src: item.picInfo[0].url,
                        desc: item.category
                    }
                } );

                console.log(moreList);

                store.commit('updateMoreList', moreList);

                return Promise.resolve();
            } )
        }

        
    }

});
