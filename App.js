document.addEventListener('DOMContentLoaded', () => {
    new Vue({
      el: '#app',
      data: {
        newItemName: '',
        newProductName: '',
        items: [],
        products: [],
        editingItemId: null,
      },
      methods: {
        addItem() {
          try {
            if (!this.newItemName || !this.newProductName) {
              alert('Item name and Product name cannot be empty');
              return;
            }
  
            if (this.editingItemId !== null) {
              // Update existing item
              const itemIndex = this.items.findIndex(item => item.id === this.editingItemId);
              this.$set(this.items, itemIndex, { id: this.editingItemId, name: this.newItemName });
              // Update corresponding product
              const productIndex = this.products.findIndex(product => product.id === this.editingItemId);
              if (productIndex !== -1) {
                this.$set(this.products, productIndex, { id: this.editingItemId, name: this.newProductName });
              }
              this.editingItemId = null;
            } else {
              // Add new item
              const newItem = { id: Date.now(), name: this.newItemName };
              this.items.push(newItem);
              // Add new product
              this.products.push({ id: newItem.id, name: this.newProductName });
            }
  
            this.newItemName = '';
            this.newProductName = '';
          } catch (error) {
            console.error('Error adding/updating item:', error.message);
          }
        },
        editItem(item) {
          this.newItemName = item.name;
          this.newProductName = this.getProductById(item.id) ? this.getProductById(item.id).name : '';
          this.editingItemId = item.id;
        },
        deleteItem(itemId) {
          try {
            // Delete item and corresponding product
            this.items = this.items.filter(item => item.id !== itemId);
            this.products = this.products.filter(product => product.id !== itemId);
          } catch (error) {
            console.error('Error deleting item:', error.message);
          }
        },
        getProductById(itemId) {
          return this.products.find(product => product.id === itemId);
        },
      },
    });
  });