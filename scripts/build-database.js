/**
 * @file build-database.js
 * @description Scans the `contributions` directory to build a JSON database of all animations.
 * This script is intended to be run by a Node.js environment during the build process (e.g., via GitHub Actions).
 *
 * It performs the following steps:
 * 1. Reads all subdirectories within the `/contributions` folder.
 * 2. For each subdirectory, it reads the `manifest.json` file.
 * 3. It validates the manifest and enriches it with generated data like `id`, `url`, and `thumbnailUrl`.
 * 4. It aggregates all contribution data into a single array.
 * 5. It writes this array to a `database.json` file in the public directory.
 */

const fs = require('fs');
const path = require('path');

// --- Configuration ---
// Path to the directory containing all individual contributions.
const CONTRIBUTIONS_DIR = path.join(__dirname, '..', 'contributions');
// Path to the public directory of the website where the final database and assets will be served.
const PUBLIC_SITE_DIR = path.join(__dirname, '..', 'public');
// The final output file name.
const OUTPUT_FILE = path.join(PUBLIC_SITE_DIR, 'database.json');
// --- End Configuration ---


/**
 * The main function that orchestrates the database build process.
 */
async function buildDatabase() {
    console.log('🚀 Starting to build the Edu3D-Verse database...');

    try {
        // Ensure the contributions directory exists.
        if (!fs.existsSync(CONTRIBUTIONS_DIR)) {
            console.error(`❌ Error: Contributions directory not found at ${CONTRIBUTIONS_DIR}`);
            // Create an empty DB if the folder doesn't exist, so the site doesn't break.
            writeDatabase([]);
            process.exit(1);
        }

        // Get all folder names inside the contributions directory.
        const contributionFolders = fs.readdirSync(CONTRIBUTIONS_DIR, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        console.log(`🔍 Found ${contributionFolders.length} potential contributions.`);

        const database = [];

        // Process each contribution folder.
        for (const folderName of contributionFolders) {
            const manifestPath = path.join(CONTRIBUTIONS_DIR, folderName, 'manifest.json');

            // Check if manifest.json exists for the contribution.
            if (!fs.existsSync(manifestPath)) {
                console.warn(`⚠️ Warning: Skipping '${folderName}' because manifest.json is missing.`);
                continue;
            }

            try {
                // Read and parse the manifest file.
                const manifestContent = fs.readFileSync(manifestPath, 'utf8');
                const manifestData = JSON.parse(manifestContent);

                // Basic validation to ensure required fields are present.
                const requiredFields = ['title', 'description', 'author_github', 'tags', 'subject', 'grade_level'];
                const missingFields = requiredFields.filter(field => !manifestData[field]);

                if (missingFields.length > 0) {
                    console.warn(`⚠️ Warning: Skipping '${folderName}' due to missing fields in manifest.json: ${missingFields.join(', ')}`);
                    continue;
                }

                // Construct the final data object for this contribution.
                const contributionData = {
                    id: folderName, // The unique ID is the folder name.
                    ...manifestData,
                    // URL to the live animation page. Assumes content is served from the root.
                    url: `/contributions/${folderName}/index.html`,
                    // URL to the auto-generated thumbnail. Assumes a convention.
                    // The thumbnail itself would be generated in a separate step (e.g., using Puppeteer).
                    thumbnail: `/contributions/${folderName}/thumbnail.png`,
                };

                database.push(contributionData);
                console.log(`✅ Processed: "${manifestData.title}" by ${manifestData.author_github}`);

            } catch (error) {
                console.error(`❌ Error processing manifest for '${folderName}':`, error.message);
            }
        }

        // Sort the database alphabetically by title for a consistent order.
        database.sort((a, b) => a.title.localeCompare(b.title));

        // Write the aggregated data to the output file.
        writeDatabase(database);

    } catch (error) {
        console.error('\nAn unexpected error occurred during the build process:');
        console.error(error);
        process.exit(1);
    }
}

/**
 * Writes the database array to the final JSON file.
 * @param {Array<Object>} database - The array of contribution data.
 */
function writeDatabase(database) {
    console.log(`\nWriting ${database.length} contributions to database...`);

    // Ensure the output directory exists before writing the file.
    if (!fs.existsSync(PUBLIC_SITE_DIR)) {
        console.log(`Creating output directory at ${PUBLIC_SITE_DIR}`);
        fs.mkdirSync(PUBLIC_SITE_DIR, { recursive: true });
    }

    // Write the file with pretty-printing for readability.
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(database, null, 2));

    console.log(`\n🎉 Database built successfully!`);
    console.log(`📄 Output file located at: ${OUTPUT_FILE}`);
}


// Run the script.
buildDatabase();