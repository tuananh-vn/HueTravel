import * as types from "./action-types";

export function fetchBundleList() {
    return ({
        type: types.FETCH_BUNDLE
    })
}

export function fetchBundleDetail(id) {
    return ({
        type: types.FETCH_BUNDLE_DETAIL,
        id
    })
}

export function changeBundleQuantity(bundle_id, quantity) {
    return ({
        type: types.UPDATE_BUNDLE_QUANTITY,
        bundle_id,
        quantity
    })
}

export function onBundleItemChanged(id, title, index, change_in_cart) {
    return ({
        type: types.UPDATE_BUNDLE_ITEM_CHANGED,
        id,
        title,
        selectedIndex: index,
        change_in_cart,
    })
}

export function onBundleItemQuantityChanged(id, title, index, quantity) {
    return ({
        type: types.UPDATE_BUNDLE_ITEM_QUANTITY_CHANGED,
        id,
        title,
        selectedIndex: index,
        quantity
    })
}

export function initializeBundleCart(id) {
    return ({
        type: types.INITIALIZE_BUNDLE_CART,
        id
    })
}

export function saveBundleProducts(products) {
	return ({
		type: types.SAVE_BUNDLE_PRODUCT_DETAIL,
		products
	})
}