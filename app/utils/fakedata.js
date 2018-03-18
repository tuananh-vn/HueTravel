/*
    This is fake data that used when backend is not ready :D
    Even when backend is ready, should still keep this file for easier to understand the data structure.
*/


export const potential_customers = [{
    customer_id: 1,
    GcafeId: '1',
    telephone: '01234567890',
    name: 'Nguyễn Văn A',
    province: 'Hà Nội',
    district: 'Cầu Giấy',
    street: 'Tầng 11 Chung cư An Tâm, số 567 Trung Kính',
    email: 'anv@gmail.com',
    lastActive: '2017-08-05 10:00',
    nextBookedContact: '2017-08-05',
    status: 'new',
    messages: [{
        time: '2017-08-05 12:00',
        type: 'schedule',
        schedule: '2017-08-05',
        comment: 'khách hàng lầy lội quá huhu',
    }, {
        time: '2017-08-05 10:00',
        type: 'message',
        content: 'Gặp khách hàng',
    }, {
        time: '2017-08-05 08:00',
        type: 'message',
        content: 'Gặp khách hàng 2',
    }, {
        time: '2017-08-05 09:00',
        type: 'quotation',
        quotation_id: 'GA#123456',
        expire: '2017-08-05 19:00',
        value: 25000000,
    }, {
        time: '2017-08-06 07:00',
        type: 'quotation',
        quotation_id: 'GA#123457',
        expire: '2017-08-09 19:00',
        value: 24000000,
    }, {
        time: '2017-08-05 12:00',
        type: 'order',
        order_id: 'GB#123458',
        quotation_id: 'GA#123456',
    }]
}, {
    GcafeId: '2',
    telephone: '01234567891',
    name: 'Nguyễn Văn B',
    province: 'Hà Nội',
    district: 'Cầu Giấy',
    street: 'Tầng 11 Chung cư An Tâm, số 567 Trung Kính',
    email: 'bnv@gmail.com',
    lastActive: '2017-08-05 09:00',
    nextBookedContact: '2017-08-15',
    status: 'new',
    messages: [{
        time: '2017-08-05 10:00',
        type: 'message',
        content: 'Gặp khách hàng',
    }, {
        time: '2017-08-05 08:00',
        type: 'message',
        content: 'Gặp khách hàng 2',
    }, {
        time: '2017-08-06 07:00',
        type: 'quotation',
        quotation_id: 'GA#123459',
        expire: '2017-08-09 19:00',
        value: 14000000,
    }, {
        time: '2017-08-05 09:00',
        type: 'quotation',
        quotation_id: 'GA#123458',
        expire: '2017-08-05 19:00',
        value: 15000000,
    }, {
        time: '2017-08-05 12:00',
        type: 'order',
        order_id: 'GB#123459',
        quotation_id: 'GA#123458',
    }]
}]

export const scheduled_local_PNs = [{
    id: 1, // the PN id that was returned by expo when we scheduled it before
    title: 'Lịch hẹn gặp khách hàng hôm nay',
    message: 'Xin chào buổi sáng, hôm nay bạn có 2 khách hàng đến lịch hẹn. Chúc may mắn!',
    type: 'meeting_today',
    keywords: ['2017-08-05', '01234567890'], // keywords include date, customer_id, order_id, quotation_id. Its purpose is: When something changed we look into those keys to see if this PN is related and need to be re-scheduled
    data: [{
        GcafeId: 1,
        name: 'Nguyễn Văn A',
        telephone: '01234567890',
        address: 'Tầng 11 Chung cư An Tâm, số 567 Trung Kính',
    }]
}, {
    id: 2,
    title: 'Lịch hẹn gặp khách hàng hôm nay',
    message: 'Xin chào buổi sáng, hôm nay bạn có 3 khách hàng đến lịch hẹn. Chúc may mắn!',
    type: 'meeting_today',
    keywords: ['2017-08-15', '01234567891'],
    data: [{
        GcafeId: 1,
        name: 'Nguyễn Văn B',
        telephone: '01234567891',
        address: 'Tầng 11 Chung cư An Tâm, số 567 Trung Kính',
    }]
}]

export const sales = {
    orders: [{
        customer: {
            id: 1,
            name: 'Người nào đó'
        },
        saleman: {
            id: 2,
            name: 'Kẻ lạ mặt'
        },
        orderlines: [{
            id: 1,
            product: {
                id: 1,
                name: 'Bàn di chuột'
            },
            price: 1000,
            quantity: 10,
        }],
        id: 3,
        state: 'sale',
        order_date: 'Mon, 14 Aug 2017 03:56:16 -0000',
        price_total: 11000,
        discount: 0,
    }],
    quotations: [{
        customer: 5,
        saleman: 2,
        orderlines: [{
            product: 1807,
            quantity: 1,
            price: 2301000,
            name: "Màn hình LG 20MP48A-1111111111",
            source_url: "http://tekshop.vn/media/catalog/product/1/9/19-22_lg_2.jpg",
            sku: "MO-LG-1006",
            bundle_name: null,
            bundle_id: null
        }, {
            product: 1807,
            quantity: 1,
            price: 2301000,
            name: "Màn hình LG 20MP48A-2222222222",
            source_url: "http://tekshop.vn/media/catalog/product/1/9/19-22_lg_2.jpg",
            sku: "MO-LG-1006",
            bundle_name: "Dàn chuẩn",
            bundle_id: 19
        }, {
            product: 1807,
            quantity: 1,
            price: 2301000,
            name: "Màn hình LG 20MP48A-3333333333",
            source_url: "http://tekshop.vn/media/catalog/product/1/9/19-22_lg_2.jpg",
            sku: "MO-LG-1006",
            bundle_name: "Dàn chuẩn",
            bundle_id: 19
        }, {
            product: 1807,
            quantity: 1,
            price: 2301000,
            name: "Màn hình LG 20MP48A-4444444444",
            source_url: "http://tekshop.vn/media/catalog/product/1/9/19-22_lg_2.jpg",
            sku: "MO-LG-1006",
            bundle_name: "Dàn ko chuẩn",
            bundle_id: 21
        }, {
            product: 1807,
            quantity: 1,
            price: 2301000,
            name: "Màn hình LG 20MP48A-55555555555",
            source_url: "http://tekshop.vn/media/catalog/product/1/9/19-22_lg_2.jpg",
            sku: "MO-LG-1006",
            bundle_name: null,
            bundle_id: null
        }],
        id: 1,
        state: 'draft',
        order_date: 'Mon, 14 Aug 2017 03:56:16 -0000',
        expire_date: 'Mon, 15 Aug 2017 23:59:00 -0000',
        price_total: 11000,
        discount: 1000,
    }]
}
