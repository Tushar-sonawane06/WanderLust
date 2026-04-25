document.getElementById("pay-btn").onclick = async function (e) {
    e.preventDefault();
  
    try {
      const checkIn = document.getElementById("checkIn").value;
      const checkOut = document.getElementById("checkOut").value;
      const guests = document.getElementById("guests").value;

      let days = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
      if (days <= 0) days = 1;
  
      const totalPrice = days * listingData.price;
  
      console.log("Days:", days);
      console.log("Total Price:", totalPrice);
  
      const res = await fetch("/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalPrice }),
      });
  
      const order = await res.json();
      console.log("Order:", order);
  
      const options = {
        key: razorpayKey, 
        amount: order.amount,
        currency: "INR",
        name: "Wanderlust",
        description: "Hotel Booking",
        order_id: order.id,
  
        handler: async function (response) {
          console.log("Payment success:", response);
  
          const bookingData = {
            listingId: listingData.id,
            checkIn,
            checkOut,
            guests,
            totalPrice
          };
  
          const verifyRes = await fetch("/payment/verify", {
            method: "POST",
            credentials: "same-origin", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...response,
              ...bookingData
            }),
          });
  
          const result = await verifyRes.json();
  
          if (result.success) {
            window.location.href = "/bookings/my/bookings"; // 
          } else {
            alert("Payment verification failed ❌");
          }
        }
      };
  
      console.log("Opening Razorpay...");
      const rzp = new Razorpay(options);
      rzp.open();
  
    } catch (err) {
      console.log("ERROR:", err);
      alert("Something went wrong ❌");
    }
  };