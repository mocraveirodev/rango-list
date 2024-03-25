function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const time = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;

    return `${year}-${month}-${day} ${time}`;
}

export function formatPromotion(promotion) {
    return {
        promotion_id: promotion.promotion_id,
        promotion_description: promotion.promotion_description,
        promotion_price: promotion.promotion_price,
        promotion_start_datetime: formatDate(new Date(promotion.promotion_start_datetime)),
        promotion_finish_datetime: formatDate(new Date(promotion.promotion_finish_datetime)),
    };
}