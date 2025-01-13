document.addEventListener('DOMContentLoaded', () => {
    const addItemModal = document.getElementById('addItemModal');
    const editItemModal = document.getElementById('editItemModal');
    const addItemForm = document.getElementById('addItemForm');
    const editItemForm = document.getElementById('editItemForm');
    const addItemBtn = document.getElementById('addItemBtn');

    // Show modal when clicking the add button
    if (addItemBtn) {
        addItemBtn.addEventListener('click', () => {
            addItemModal.classList.add('active');
        });
    }

    // Close modal when clicking the close button
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            addItemModal.classList.remove('active');
            editItemModal.classList.remove('active');
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === addItemModal) {
            addItemModal.classList.remove('active');
        }
        if (event.target === editItemModal) {
            editItemModal.classList.remove('active');
        }
    });

    // Handle add form submission
    if (addItemForm) {
        addItemForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                const formData = new FormData(addItemForm);
                const data = Object.fromEntries(formData.entries());
                
                const response = await axios.post('/api/items', data);
                
                if (response.data.success) {
                    alert('Item added successfully!');
                    addItemForm.reset();
                    addItemModal.classList.remove('active');
                    window.location.reload();
                } else {
                    throw new Error(response.data.error || 'Failed to add item');
                }
            } catch (error) {
                console.error('Error adding item:', error);
                alert('Error adding item: ' + (error.response?.data?.error || error.message));
            }
        });
    }

    // Handle edit form submission
    if (editItemForm) {
        editItemForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                const formData = new FormData(editItemForm);
                const data = Object.fromEntries(formData.entries());
                const itemId = document.getElementById('editItemId').value;
                
                const response = await axios.put(`/api/items/${itemId}`, data);
                
                if (response.data.success) {
                    alert('Item updated successfully!');
                    editItemForm.reset();
                    editItemModal.classList.remove('active');
                    window.location.reload();
                } else {
                    throw new Error(response.data.error || 'Failed to update item');
                }
            } catch (error) {
                console.error('Error updating item:', error);
                alert('Error updating item: ' + (error.response?.data?.error || error.message));
            }
        });
    }

    // Search and sort functionality
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');

    if (searchInput) {
        searchInput.addEventListener('input', filterItems);
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', filterItems);
    }
});

// Edit item function
function openEditModal(id, name, description, price, category) {
    const editItemModal = document.getElementById('editItemModal');
    const editItemForm = document.getElementById('editItemForm');
    
    // Set form values
    document.getElementById('editItemId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editDescription').value = description;
    document.getElementById('editPrice').value = price;
    document.getElementById('editCategory').value = category;
    
    // Show modal
    editItemModal.classList.add('active');
}

// Delete item function
async function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            const response = await axios.delete(`/api/items/${id}`);
            if (response.data.success) {
                // Remove the item card from the DOM
                const itemCard = document.querySelector(`[data-id="${id}"]`);
                itemCard.remove();
                
                // Update stats
                updateStats();
                
                alert('Item deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Error deleting item: ' + (error.response?.data?.error || error.message));
        }
    }
}

// Filter and sort items
function filterItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;
    const itemsContainer = document.querySelector('.items-container');
    const items = Array.from(document.querySelectorAll('.item-card'));

    const filteredAndSortedItems = items
        .filter(item => {
            const name = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('.description').textContent.toLowerCase();
            return name.includes(searchTerm) || description.includes(searchTerm);
        })
        .sort((a, b) => {
            const nameA = a.querySelector('h3').textContent;
            const nameB = b.querySelector('h3').textContent;
            const priceA = parseFloat(a.querySelector('.price').textContent.slice(1));
            const priceB = parseFloat(b.querySelector('.price').textContent.slice(1));
            
            switch (sortValue) {
                case 'nameAsc':
                    return nameA.localeCompare(nameB);
                case 'nameDesc':
                    return nameB.localeCompare(nameA);
                case 'priceAsc':
                    return priceA - priceB;
                case 'priceDesc':
                    return priceB - priceA;
                default:
                    return 0;
            }
        });

    itemsContainer.innerHTML = '';
    filteredAndSortedItems.forEach(item => itemsContainer.appendChild(item));
}

// Update stats after modifications
function updateStats() {
    const items = document.querySelectorAll('.item-card');
    const totalItems = document.getElementById('totalItems');
    const totalValue = document.getElementById('totalValue');
    
    if (totalItems) {
        totalItems.textContent = items.length;
    }
    
    if (totalValue) {
        const total = Array.from(items)
            .reduce((sum, item) => {
                const price = parseFloat(item.querySelector('.price').textContent.slice(1));
                return sum + price;
            }, 0);
        totalValue.textContent = '$' + total.toFixed(2);
    }
}