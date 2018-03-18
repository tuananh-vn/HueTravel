import {Alert, Platform, AsyncStorage} from 'react-native';
import { Notifications, Constants } from 'expo';
import config from '../config';


export function handleNotificationDetail(notifi, navigation) {
    console.log("handleNotificationDetail: " + JSON.stringify(notifi.data));
    if (notifi.remote) {
        console.log("remote, sender: " + notifi.data.sender);
        // online PN, redirect to according screen
        if (notifi.data.sender === 'offline_sales') {
            console.log("remote, title: " + notifi.data.title);
            switch (notifi.data.title) {
                case 'order':
                    navigation.navigateWithDebounce({routeName: 'Sale', params: {redirect: 'OrderManagement'}});
                    break;
                case 'gcafe':
                    navigation.navigateWithDebounce({routeName: 'CS'});
                    break;
                case 'promotion':
                    navigation.navigateWithDebounce({routeName: 'Sale', params: {redirect: 'Promotion'}});
                    break;
                default:
                    break;
            }
        } else if (notifi.data.sender === 'finance') {
            navigation.navigateWithDebounce({routeName: 'Finance'});
        } else if (notifi.data.sender === 'logistic') {
            navigation.navigateWithDebounce({routeName: 'Logistic'});
        }
    } else {
        console.log("local, sender: " + notifi.data.sender);
        // offline PN, redirect to PN detail screen
        if (notifi.data.sender === 'offline_sales') {
            console.log("local, title: " + notifi.data.title);
            switch (notifi.data.title) {
                case 'customer':
                    navigation.navigateWithDebounce({routeName: 'Sale', params: { redirect: 'NotificationDetail', message: notifi.data.message, type: 'customer', data: notifi.data.data}});
                    break;
                case 'quotation':
                    navigation.navigateWithDebounce({routeName: 'Sale', params: { redirect: 'NotificationDetail', message: notifi.data.message, type: 'quotation', data: notifi.data.data}});
                    break;
                default:
                    break;
            }
        }
    }
}

export function mapRealtimeToTesttime(target) {
    // for easier testing:
    // 30 minutes = 1 day, count from current time
    let mode = 'immediate';
    console.log("schedule real: " + target.toLocaleString());
    if (mode === 'test') {
        let current = new Date();
        let d1 = new Date(current);
        d1.setHours(0);
        d1.setMinutes(0)
        let d2 = new Date(target);
        d1.setHours(1);
        d1.setMinutes(0)

        let deltaDays = Math.floor((d2.getTime() - d1.getTime()) / 1000 / 86400);
        let testTime = new Date(current.getTime() + (30 * 60000 * deltaDays));
        console.log("schedule test: " + testTime.toLocaleString());
        return testTime;
    } else if (mode === 'immediate') {
        return new Date(new Date().getTime() + 60000);
    } else {
        return target;
    }
}

export async function cancelScheduledPN(scheduledPNs, type, keywords) {
    let check = (entry) => {
        if (entry.type === type) {
            for (let i = 0; i < keywords.length; i++) {
                if (entry.keywords.indexOf(keywords[i]) !== -1) {
                    return true;
                }
            }
        }
        return false;
    }

    let toKeep = scheduledPNs.filter((entry) => !check(entry));
    let toCancel = scheduledPNs.filter(check);
    toCancel.forEach((entry) => {
        Notifications.cancelScheduledNotificationAsync(entry.id);
    })
    await AsyncStorage.setItem('scheduled_local_PN', JSON.stringify(toKeep));
    return toKeep;
}

export async function scheduleMeetingTodayPN(scheduledPNs, potentials, date) {
    // calculate PN data for this date
    let potentialsInDate = potentials.filter((entry) => {
        return (entry.status !== 'closed' && entry.nextBookedContact === date)
    });
    if (potentialsInDate.length > 0) {
        let notifi = {
            id: 0,
            title: 'Lịch hẹn gặp khách hàng hôm nay',
            message: 'Xin chào buổi sáng, hôm nay bạn có ' + potentialsInDate.length + ' khách hàng đến lịch hẹn. Chúc may mắn!',
            type: 'meeting_today',
            keywords: potentialsInDate.map((entry) => entry.telephone).concat([date]),
            data: potentialsInDate.map((entry) => {return {
                GcafeId: entry.GcafeId,
                name: entry.name,
                telephone: entry.telephone,
                address: getCustomerFullAddress(entry),
            }}),
        }

        console.log("schedulePN : " + JSON.stringify(notifi));
        // schedule PN
        let scheduleTime = new Date(date + 'T01:00:00Z');
        scheduleTime = mapRealtimeToTesttime(scheduleTime);
        if (scheduleTime > new Date()) {
            notifi.id = await Notifications.scheduleLocalNotificationAsync({
                title: notifi.title,
                body: notifi.message,
                data: {
                    id: new Date().getTime(),
                    created_at: scheduleTime.toISOString(),
                    title: 'customer',
                    message: notifi.message,
                    sender: 'offline_sales',
                    data: notifi.data,
                },
                sound: true,
            }, {
                time: scheduleTime, // for example: 2017-08-10T01:00:00Z , aka 2017-08-10T08:00:00 GMT+7
            });
            scheduledPNs.push(notifi);
            await AsyncStorage.setItem('scheduled_local_PN', JSON.stringify(scheduledPNs));
            return scheduledPNs;
        } else {
            return scheduledPNs;
        }
    } else {
        return scheduledPNs;
    }
}

export async function scheduleMissingMeetingPN(scheduledPNs, potentials, date) {
    // calculate PN data for this date
    let thatDate = new Date(date + 'T01:00:00Z').toISOString();
    let potentialsInDate = potentials.filter((entry) => {
        return (entry.status !== 'closed' && entry.nextBookedContact === date && new Date(entry.lastActive) < new Date(thatDate))
    });
    if (potentialsInDate.length > 0) {
        let notifi = {
            id: 0,
            title: 'Các khách hàng chưa liên hệ',
            message: 'Xin chào buổi sáng, hôm qua bạn có ' + potentialsInDate.length + ' khách hàng bị lỡ hẹn.',
            type: 'meeting_miss',
            keywords: potentialsInDate.map((entry) => entry.telephone).concat([date]),
            data: potentialsInDate.map((entry) => {return {
                GcafeId: entry.GcafeId,
                name: entry.name,
                telephone: entry.telephone,
                address: getCustomerFullAddress(entry),
            }}),
        }

        console.log("schedulePN : " + JSON.stringify(notifi));
        // schedule PN for the next morning
        let scheduleTime = new Date(date + 'T01:00:00Z');
        scheduleTime.setDate(scheduleTime.getDate() + 1);
        scheduleTime = mapRealtimeToTesttime(scheduleTime);
        if (scheduleTime > new Date()) {
            notifi.id = await Notifications.scheduleLocalNotificationAsync({
                title: notifi.title,
                body: notifi.message,
                data: {
                    id: new Date().getTime(),
                    created_at: scheduleTime.toISOString(),
                    title: 'customer',
                    message: notifi.message,
                    sender: 'offline_sales',
                    data: notifi.data,
                },
                sound: true,
            }, {
                time: scheduleTime, // for example: 2017-08-10T01:00:00Z , aka 2017-08-10T08:00:00 GMT+7
            });
            scheduledPNs.push(notifi);
            await AsyncStorage.setItem('scheduled_local_PN', JSON.stringify(scheduledPNs));
            return scheduledPNs;
        } else {
            return scheduledPNs;
        }
    } else {
        return scheduledPNs;
    }
}

export async function scheduleQuotationTodayPN(scheduledPNs, quotations, date) {
    // calculate PN data for this date
    let thatDate = new Date(date + 'T01:00:00Z').toISOString().slice(0, 10);
    let quotationsInDate = quotations.filter((entry) => {
        return (new Date(entry.expire_date).toISOString().slice(0, 10) === thatDate)
    });
    if (quotationsInDate.length > 0) {
        let notifi = {
            id: 0,
            title: 'Các báo giá sắp hết hạn hôm nay',
            message: 'Xin chào buổi sáng, bạn có ' + quotationsInDate.length + ' báo giá sẽ hết hạn vào cuối ngày.',
            type: 'quotation_today',
            keywords: quotationsInDate.map((entry) => entry.id).concat([date]),
            data: quotationsInDate.map((entry) => {return {
                id: entry.id,
                customer_name: entry.customer.name,
                telephone: entry.customer.mobile,
                value: entry.price_total,
            }}),
        }

        console.log("schedulePN : " + JSON.stringify(notifi));
        // schedule PN for the next morning
        let scheduleTime = new Date(date + 'T01:00:00Z');
        scheduleTime = mapRealtimeToTesttime(scheduleTime);
        if (scheduleTime > new Date()) {
            notifi.id = await Notifications.scheduleLocalNotificationAsync({
                title: notifi.title,
                body: notifi.message,
                data: {
                    id: new Date().getTime(),
                    created_at: scheduleTime.toISOString(),
                    title: 'quotation',
                    message: notifi.message,
                    sender: 'offline_sales',
                    data: notifi.data,
                },
                sound: true,
            }, {
                time: scheduleTime, // for example: 2017-08-10T01:00:00Z , aka 2017-08-10T08:00:00 GMT+7
            });
            scheduledPNs.push(notifi);
            await AsyncStorage.setItem('scheduled_local_PN', JSON.stringify(scheduledPNs));
            return scheduledPNs;
        } else {
            return scheduledPNs;
        }
    } else {
        return scheduledPNs;
    }
}

export async function scheduleQuotationExpirePN(scheduledPNs, quotations, date) {
    // calculate PN data for this date
    let thatDate = new Date(date + 'T01:00:00Z').toISOString().slice(0, 10);
    let quotationsInDate = quotations.filter((entry) => {
        return (new Date(entry.expire_date).toISOString().slice(0, 10) === thatDate)
    });
    if (quotationsInDate.length > 0) {
        let notifi = {
            id: 0,
            title: 'Báo giá quá hạn hôm qua',
            message: 'Xin chào buổi sáng, bạn có ' + quotationsInDate.length + ' báo giá đã quá hạn hôm qua.',
            type: 'quotation_expire',
            keywords: quotationsInDate.map((entry) => entry.id).concat([date]),
            data: quotationsInDate.map((entry) => {return {
                id: entry.id,
                customer_name: entry.customer.name,
                telephone: entry.customer.mobile,
                value: entry.price_total,
            }}),
        }

        console.log("schedulePN : " + JSON.stringify(notifi));
        // schedule PN for the next morning
        let scheduleTime = new Date(date + 'T01:00:00Z');
        scheduleTime.setDate(scheduleTime.getDate() + 1);
        scheduleTime = mapRealtimeToTesttime(scheduleTime);
        if (scheduleTime > new Date()) {
            notifi.id = await Notifications.scheduleLocalNotificationAsync({
                title: notifi.title,
                body: notifi.message,
                data: {
                    id: new Date().getTime(),
                    created_at: scheduleTime.toISOString(),
                    title: 'quotation',
                    message: notifi.message,
                    sender: 'offline_sales',
                    data: notifi.data,
                },
                sound: true,
            }, {
                time: scheduleTime, // for example: 2017-08-10T01:00:00Z , aka 2017-08-10T08:00:00 GMT+7
            });
            scheduledPNs.push(notifi);
            await AsyncStorage.setItem('scheduled_local_PN', JSON.stringify(scheduledPNs));
            return scheduledPNs;
        } else {
            return scheduledPNs;
        }
    } else {
        return scheduledPNs;
    }
}
