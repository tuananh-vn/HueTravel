import {Alert, Platform, AsyncStorage, Text} from 'react-native';
import React, {Component} from "react";
import config from '../config';


export function getCustomerFullAddress(customer) {
    let fullAddress = customer.street;
    if (customer.district && fullAddress.indexOf(customer.district) === -1) {
        fullAddress = fullAddress + ', ' + customer.district;
    }
    if (customer.province && fullAddress.indexOf(customer.province) === -1) {
        fullAddress = fullAddress + ', ' + customer.province;
    }
    return fullAddress;
}

export function getCustomerMostRecentQuotation(quotations) {
    quotations.sort((a, b) => {
        return (a.time < b.time);
    });
    return quotations[0] || {value: 0};
}

export function getCustomerStatusText(status) {
    switch (status) {
        case 'new':
            return <Text style={{color: '#1fb08a', fontWeight: 'bold'}}>Mới</Text>;
        case 'qualified':
            return <Text style={{color: '#148aff', fontWeight: 'bold'}}>Đang liên hệ</Text>;
        case 'proposition':
            return <Text style={{color: '#357ae8', fontWeight: 'bold'}}>Đã báo giá</Text>;
        case 'won':
            return <Text style={{color: '#1fb08a', fontWeight: 'bold'}}>Thắng</Text>;
        case 'lost':
            return <Text style={{color: '#de342f', fontWeight: 'bold'}}>Thua</Text>;
        default:
            return <Text style={{color: '#ff0000', fontWeight: 'bold'}}>{status}</Text>;
    }
}

export function convertOpportunitiesToPotentials(opportunities) {
    return opportunities.map((entry) => {
        let orders = entry.orders.map((o) => {
            return {
                time: new Date(o.timestamp).toISOString(),
                type: (o.state === 'draft')? 'quotation':'order',
                order_id: o.id,
                value: o.price_total,
                expired_date: o.expired_date,
            }
        })
        let comments = entry.comments.map((c) => {
            return {
                time: new Date(c.timestamp).toISOString(),
                type: 'message',
                content: c.content
            }
        })
        let schedules = entry.activities_log.map((a) => {
            return {
                time: new Date(a.timestamp).toISOString(),
                type: 'schedule',
                schedule: new Date(a.activity_date).toISOString().slice(0, 10),
                comment: a.comment,
            }
        })
        return {
            id: entry.id,
            customer_id: entry.customer.id,
            GcafeId: entry.customer.gcafe_id,
            telephone: entry.customer.mobile,
            name: entry.customer.name,
            province: entry.customer.province,
            district: entry.customer.district,
            street: entry.customer.street,
            email: entry.customer.email,
            lastActive: entry.last_action_date,
            nextBookedContact: new Date(entry.next_activity_date).toISOString().slice(0, 10),
            status: entry.stage,
            messages: schedules.concat(comments).concat(orders)
        }
    })
}
