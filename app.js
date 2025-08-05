document.addEventListener('DOMContentLoaded', () => {
    // DOM Element References
    const tagsContainer = document.getElementById('tags-container');
    const cardsGrid = document.getElementById('cards-grid');
    const searchInput = document.getElementById('search-input');

    let allContributions = []; // To store all data from JSON

    // --- DATA FETCHING ---
    async function fetchData() {
        try {
            // 在实际项目中，这个路径应该指向构建后生成的 database.json
            const response = await fetch('./public/database.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allContributions = await response.json();
            initComponents();
        } catch (error) {
            console.error("Could not fetch data:", error);
            cardsGrid.innerHTML = `<p class="loading-text">加载失败，请检查控制台信息。</p>`;
        }
    }

    // --- COMPONENT INITIALIZATION ---
    function initComponents() {
        renderTags();
        renderCards(allContributions);
        setupEventListeners();
    }

    // --- RENDERING FUNCTIONS ---
    function renderTags() {
        const allTags = new Set();
        allContributions.forEach(item => {
            item.tags.forEach(tag => allTags.add(tag));
        });

        let tagsHTML = `<button class="tag-btn active" data-tag="All">全部</button>`;
        allTags.forEach(tag => {
            tagsHTML += `<button class="tag-btn" data-tag="${tag}">${tag}</button>`;
        });
        tagsContainer.innerHTML = tagsHTML;
    }

    function renderCards(items) {
        if (items.length === 0) {
            cardsGrid.innerHTML = `<p class="loading-text">没有找到匹配项。</p>`;
            return;
        }

        cardsGrid.innerHTML = items.map(item => `
            <div class="card">
                <img src="./contributions/${item.id}/thumbnail.png" alt="${item.title}" class="card-thumbnail" onerror="this.style.display='none'">
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-description">${item.description}</p>
                    <div class="card-footer">
                        <div class="author">
                            <span class="author-name">${item.author_github}</span>
                        </div>
                        <a href="./contributions/${item.id}/index.html" target="_blank" class="view-btn">查看</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // --- EVENT HANDLING ---
    function setupEventListeners() {
        // Tag filtering
        tagsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag-btn')) {
                // Update active button style
                tagsContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');

                const selectedTag = e.target.dataset.tag;
                filterAndRender(selectedTag, searchInput.value);
            }
        });

        // Search input
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value;
            const activeTag = tagsContainer.querySelector('.active').dataset.tag;
            filterAndRender(activeTag, searchTerm);
        });
    }

    // --- FILTERING LOGIC ---
    function filterAndRender(tag, searchTerm) {
        let filteredItems = allContributions;

        // Filter by tag
        if (tag !== 'All') {
            filteredItems = filteredItems.filter(item => item.tags.includes(tag));
        }

        // Filter by search term
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filteredItems = filteredItems.filter(item =>
                item.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                item.description.toLowerCase().includes(lowerCaseSearchTerm) ||
                item.tags.some(t => t.toLowerCase().includes(lowerCaseSearchTerm))
            );
        }

        renderCards(filteredItems);
    }

    // --- INITIALIZE THE APP ---
    fetchData();
});