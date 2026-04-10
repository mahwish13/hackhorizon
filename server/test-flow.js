const fs = require('fs');

async function test() {
    const baseUrl = 'http://localhost:5000/api';
    let sellerToken, buyerToken, invoiceId;

    try {
        console.log('1. Registering Seller...');
        const res1 = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: "Seller User", 
                email: "seller@test.com", 
                password: "password123", 
                role: "seller", 
                gstin: "27AAPFU0939F1ZV" 
            })
        });
        const data1 = await res1.json();
        sellerToken = data1.data.token;
        console.log('Seller registered, token obtained.');

        console.log('2. Registering Buyer...');
        const res2 = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: "Buyer User", 
                email: "buyer@test.com", 
                password: "password123", 
                role: "buyer", 
                gstin: "29GGGGG1314R9Z6" 
            })
        });
        const data2 = await res2.json();
        buyerToken = data2.data.token;
        console.log('Buyer registered, token obtained.');

        console.log('3. Creating Invoice as Seller...');
        const res3 = await fetch(`${baseUrl}/invoices`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sellerToken}`
            },
            body: JSON.stringify({ 
                invoiceNumber: "INV-001", 
                buyerGstin: "29GGGGG1314R9Z6", 
                amount: 10000, 
                tax: { cgst: 900, sgst: 900, igst: 0 }, 
                date: "2024-04-01" 
            })
        });
        const data3 = await res3.json();
        invoiceId = data3.data._id;
        console.log(`Invoice created: ${invoiceId}`);

        console.log('4. Fetching Received Invoices as Buyer...');
        const res4 = await fetch(`${baseUrl}/invoices/received`, {
            headers: { 'Authorization': `Bearer ${buyerToken}` }
        });
        const data4 = await res4.json();
        console.log(`Received ${data4.data.length} invoices.`);

        console.log('5. Updating Status as Buyer...');
        const res5 = await fetch(`${baseUrl}/invoices/${invoiceId}/status`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${buyerToken}`
            },
            body: JSON.stringify({ status: "accepted", note: "Looks correct" })
        });
        const data5 = await res5.json();
        console.log(`Status updated to: ${data5.data.status}`);

        console.log('6. Updating Payment Status as Seller...');
        const res6 = await fetch(`${baseUrl}/invoices/${invoiceId}/payment`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sellerToken}`
            },
            body: JSON.stringify({ paymentStatus: "paid" })
        });
        const data6 = await res6.json();
        console.log(`Payment Status updated to: ${data6.data.paymentStatus}`);

        console.log('7. Checking Seller Dashboard...');
        const res7 = await fetch(`${baseUrl}/dashboard/seller`, {
            headers: { 'Authorization': `Bearer ${sellerToken}` }
        });
        const data7 = await res7.json();
        console.log('Seller Stats:', JSON.stringify(data7.data, null, 2));

        console.log('8. Checking Buyer Dashboard...');
        const res8 = await fetch(`${baseUrl}/dashboard/buyer`, {
            headers: { 'Authorization': `Bearer ${buyerToken}` }
        });
        const data8 = await res8.json();
        console.log('Buyer Stats:', JSON.stringify(data8.data, null, 2));

        console.log('9. Checking GST Summary...');
        const res9 = await fetch(`${baseUrl}/dashboard/gst`, {
            headers: { 'Authorization': `Bearer ${sellerToken}` }
        });
        const data9 = await res9.json();
        console.log('GST Summary:', JSON.stringify(data9.data, null, 2));

        console.log('10. Creating Invoice Request as Buyer...');
        const res10 = await fetch(`${baseUrl}/requests`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${buyerToken}`
            },
            body: JSON.stringify({ 
                sellerGstin: "27AAPFU0939F1ZV", 
                note: "Please send invoice for March order" 
            })
        });
        const data10 = await res10.json();
        console.log('Request created.');

        console.log('11. Viewing Incoming Requests as Seller...');
        const res11 = await fetch(`${baseUrl}/requests/incoming`, {
            headers: { 'Authorization': `Bearer ${sellerToken}` }
        });
        const data11 = await res11.json();
        console.log(`Incoming requests found: ${data11.data.length}`);

        console.log('12. Switching Role as Seller...');
        const res12 = await fetch(`${baseUrl}/auth/switch-role`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${sellerToken}` }
        });
        const data12 = await res12.json();
        console.log(`New role: ${data12.data.newRole}`);

        console.log('\n--- ALL TESTS PASSED SUCCESSFULLY! ---');
    } catch (err) {
        console.error('\n--- TEST FAILED ---');
        console.error(err);
        process.exit(1);
    }
}

test();
