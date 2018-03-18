import {Alert, Platform, AsyncStorage} from 'react-native';
import MARGIN from "../config/margin_product.json";
import config from '../config';


export function calculatePrice(items) {
    if (items.length === 0)
        return 0;

    if (items.length === 1) {
        return {
            totalPrice: parseInt(items[0].product.price) * items[0].quantity,
            subPrice: 0,
            generatePrice: parseInt(items[0].product.price * items[0].quantity)
        }
    } else {
        let recommended_Price = 0;
        let import_price_w_margin = 0;
        let import_price = 0;
        let price = 0;

        items.forEach(function (item) {
            // Calculate price
            price += parseInt(item.product.price) * item.quantity;
            // Calculate recommended Price
            if (item.product.recommended_price && item.product.recommended_price > 0) {
                recommended_Price += item.product.recommended_price * item.quantity;
            } else {
                recommended_Price += parseInt(item.product.import_price_w_margin) * item.quantity;
            }

            // Calculate price_w_margin
            if (parseInt(item.product.import_price_w_margin) === item.product.import_price)
                import_price_w_margin += Math.ceil(item.product.import_price * 1.05) * item.quantity;
            else
                import_price_w_margin += parseInt(item.product.import_price_w_margin) * item.quantity;

            // Calculate price_w_margin_by_order
            import_price += item.product.import_price * item.quantity;
        });

        let price_w_margin_by_order = import_price;
        let index = MARGIN.findIndex(x => parseInt(x.min) < import_price && parseInt(x.max) > import_price);

        if (index > 0)
            price_w_margin_by_order = Math.ceil(import_price * MARGIN[index].value);
        else
            price_w_margin_by_order = import_price_w_margin;

        let total = Math.min(recommended_Price, import_price_w_margin, price_w_margin_by_order);

        price = Math.ceil(price / 1000) * 1000;
        total = Math.ceil(total / 1000) * 1000;

        return {totalPrice: price, subPrice: (price - total), generatePrice: total}
    }
}

export function getItemForAccessory(item) {
    let data = item.data;
    let index = item.index;
    if (data && data.length > index && index >= 0){
        if(data[index].available) {
            if (data[index].best_price) {
                data[index].price = data[index].best_price;
            }
            return data[index];
        } else return null;
    }
    return null;
}

export function calculateTotalCartItems(items, bundles) {
    let total = 0;
    let keys = Object.keys(items);
    if (keys && keys.length > 0) {
        for (let key in keys) {
            let products = items[keys[key]];
            if (products && products.length > 0) {
                for (let i = 0; i < products.length; i++) {
                    let product = products[i];
                    if (product.hasOwnProperty('quantity')) {
                        total += product.quantity;
                    }
                }
            }
        }
    }

    let bundle_keys = Object.keys(bundles);
    if (bundle_keys && bundle_keys.length > 0) {
        for (let bundle_key in bundle_keys) {

            let bundle = bundles[bundle_keys[bundle_key]];
            let item_total = 0;
            if (bundle.data
                && bundle.hasOwnProperty('quantity') && bundle.quantity > 0
                && bundle.data.length > 0) {
                for (let i = 0; i < bundle.data.length; i++) {
                    let item = bundle.data[i];
                    if (item.data
                        && item.index >= 0 && item.index < item.data.length &&
                        item.data[item.index].hasOwnProperty('quantity')) {
                        item_total+= item.data[item.index].quantity;
                    }
                }
            }
            if (item_total == 0) {
                if (bundle.hasOwnProperty('quantity') && bundle.quantity > 0) {
                    total += parseInt(bundle.quantity);
                }
            } else {
                total += item_total;
            }
        }
    }

    return total;
}

export function buildProductListFromCarts(bundleCart, bundleInfo, items) {
    let itemList = [];
    let bundleInfoMap = {};

    // prepare bundle info for looking up later
    for (let bundleGroup in bundleInfo) {
        for (let idx in bundleInfo[bundleGroup].data) {
            let bundle = bundleInfo[bundleGroup].data[idx];
            bundleInfoMap[bundle.id] = {
                name: bundle.name
            };
        }
    }

    // iterate list bundle, get the items inside
    for (let bundleId in bundleCart) {
        let {quantity, data} = bundleCart[bundleId];
        if (quantity > 0) {
            for (let itemType in data) {
                let {index} = data[itemType];
                let item = data[itemType].data[index.toString()];
                if (item.quantity > 0) {
                    itemList.push({
                        product: item.id,
                        quantity: item.quantity,
                        price_per_item: item.price,
                        name: item.name,
                        source_url: item.source_url,
                        sku: item.sku,
                        bundle_name: bundleInfoMap[bundleId].name,
                        bundle_id: parseInt(bundleId)
                    })
                }
            }
        }
    }

    // interate list items in cart
    for (let unknown in items) {
        items[unknown].forEach((i) => {
            let item = i.product;
            if (i.quantity > 0) {
                itemList.push({
                    product: item.id,
                    quantity: i.quantity,
                    price_per_item: item.price,
                    name: item.name,
                    source_url: item.source_url,
                    sku: item.sku,
                    bundle_name: null,
                    bundle_id: null
                })
            }
        })
    }

    return itemList;
}

export function buildCartsFromProductList(orderlines) {
    let items = [];
    let bundles = [];

    orderlines.forEach((entry) => {
        let e = {
            id: entry.id,
            price: entry.price_per_item,
            quantity: entry.quantity,
            source_url: entry.product.image,
            sku: entry.product.sku,
            name: entry.product.name
        }
        if (!entry.bundle_id && !entry.bundle_name) {
            items.push(e);
        } else {
            let idx = bundles.findIndex((b) => b.id === entry.bundle_id);
            if (idx !== -1) {
                bundles[idx].items.push(e);
            } else {
                bundles.push({
                    id: entry.bundle_id,
                    name: entry.bundle_name,
                    items: [e]
                })
            }
        }
    })

    return { items, bundles };
}

export function convertServerOrdersToClientOrders(orders) {
    return orders.map((entry) => {
        let {items, bundles} = buildCartsFromProductList(entry.orderlines);
        return {
            id: entry.id,
            state: entry.state,
            invoice: {
                totalPrice: entry.price_total + entry.discount,
                subPrice: entry.discount,
                generatePrice: entry.price_total,
                deposit: entry.deposit,
            },
            order_date: new Date(entry.order_date).toISOString(),
            expired_date: new Date(entry.expired_date).toISOString(),
            shipping_info: entry.shipping_info,
            customer: {
                id: entry.customer.id,
                name: entry.customer.name,
                telephone: entry.customer.mobile,
                GcafeId: entry.customer.gcafe_id,
                email: entry.customer.email,
                street: entry.customer.street,
                district: entry.customer.district,
                province: entry.customer.province,
            },
            items: items,
            bundles: bundles,
        }
    })
}
