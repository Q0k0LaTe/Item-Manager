<div class="error-container">
    <div class="error-content">
        <h1><i class="fas fa-exclamation-triangle"></i> <%= error.status || 500 %></h1>
        <h2><%= message %></h2>
        
        <% if (process.env.NODE_ENV === 'development' && error.stack) { %>
            <div class="error-details">
                <pre><code><%= error.stack %></code></pre>
            </div>
        <% } %>
        
        <div class="error-actions">
            <a href="/" class="btn-primary">
                <i class="fas fa-home"></i> Back to Home
            </a>
        </div>
    </div>
</div>

<style>
.error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 2rem;
}

.error-content {
    text-align: center;
    max-width: 600px;
}

.error-content h1 {
    font-size: 4rem;
    color: var(--danger-color);
    margin-bottom: 1rem;
}

.error-content h2 {
    font-size: 1.5rem;
    color: var(--dark-color);
    margin-bottom: 2rem;
}

.error-details {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 5px;
    margin: 2rem 0;
    text-align: left;
    overflow-x: auto;
}

.error-details pre {
    margin: 0;
    font-size: 0.9rem;
}

.error-actions {
    margin-top: 2rem;
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    background: var(--primary-color);
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background: #2980b9;
    transform: translateY(-2px);
}
</style>