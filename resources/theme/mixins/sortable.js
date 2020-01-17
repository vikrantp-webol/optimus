export default {
    methods: {
        findItemIndex(items, itemId) {
            return items.findIndex(({ id }) => {
                return itemId === id;
            });
        },

        canMoveItemUp(items, itemId) {
            let index = this.findItemIndex(items, itemId);

            return index > 0;
        },

        canMoveItemDown(items, itemId) {
            let index = this.findItemIndex(items, itemId);

            return (index + 1) < items.length;
        },

        moveItemUp(items, itemId) {
            if (this.canMoveItemUp(items, itemId)) {
                let index = this.findItemIndex(items, itemId);

                this.move(itemId, index, index - 1);
            }
        },

        moveItemDown(items, itemId) {
            if (this.canMoveItemDown(items, itemId)) {
                let index = this.findItemIndex(items, itemId);

                this.move(itemId, index, index + 1);
            }
        },

        moveItem(items, from, to) {
            let newItems = [ ...items ];
            newItems.splice(to, 0, newItems.splice(from, 1)[0]);

            return newItems;
        },

        getMoveDirection(from, to) {
            return from > to ? 'up' : 'down';
        },
    },
};
