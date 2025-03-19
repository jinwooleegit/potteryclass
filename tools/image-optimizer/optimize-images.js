/**
 * 도예수업 웹사이트 이미지 최적화 스크립트
 * 
 * 이 스크립트는 웹사이트에 사용되는 이미지를 최적화하여 로딩 시간을 단축합니다.
 * 주요 기능:
 * 1. 이미지 크기 조정 (해상도 최적화)
 * 2. 이미지 압축 (용량 최적화)
 * 3. 다양한 크기의 반응형 이미지 생성
 * 4. WebP 형식으로 변환 (선택적)
 * 
 * 사용법: 
 * 1. npm install sharp glob
 * 2. node optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 설정
const config = {
    inputGlob: '../../images/**/*.{jpg,jpeg,png,gif}', // 처리할 이미지 경로
    outputDir: '../../images/optimized', // 최적화된 이미지 저장 경로
    sizes: [
        { width: 1920, suffix: 'large' },   // 대형 화면
        { width: 1280, suffix: 'medium' },  // 중형 화면
        { width: 640, suffix: 'small' },    // 모바일
        { width: 320, suffix: 'thumb' }     // 섬네일
    ],
    jpegQuality: 80,                        // JPEG 품질 (0-100)
    pngQuality: 80,                         // PNG 품질 (0-100)
    webp: true,                             // WebP 형식 생성 여부
    webpQuality: 75,                        // WebP 품질 (0-100)
    keepOriginals: true                     // 원본 파일 유지 여부
};

// 디렉토리 생성 함수
function ensureDirectoryExists(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) return true;
    
    ensureDirectoryExists(dirname);
    fs.mkdirSync(dirname);
    return true;
}

// 파일 이름 생성 함수
function generateOutputFilename(inputPath, size, format) {
    const parsedPath = path.parse(inputPath);
    const relativePath = inputPath.replace('../../', '');
    const relativeDir = path.dirname(relativePath);
    
    const outputDir = path.join(config.outputDir, relativeDir);
    const filename = `${parsedPath.name}-${size.suffix}${format ? '.' + format : parsedPath.ext}`;
    
    return path.join(outputDir, filename);
}

// 이미지 처리 함수
async function processImage(imagePath) {
    console.log(`처리 중: ${imagePath}`);
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    // 각 크기별로 이미지 생성
    for (const size of config.sizes) {
        // 원본보다 큰 크기로는 조정하지 않음
        if (metadata.width < size.width) continue;
        
        const outputFilename = generateOutputFilename(imagePath, size);
        ensureDirectoryExists(outputFilename);
        
        // JPEG 또는 PNG 처리
        if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
            await image
                .resize(size.width)
                .jpeg({ quality: config.jpegQuality })
                .toFile(outputFilename);
        } else if (metadata.format === 'png') {
            await image
                .resize(size.width)
                .png({ quality: config.pngQuality })
                .toFile(outputFilename);
        } else {
            await image
                .resize(size.width)
                .toFile(outputFilename);
        }
        
        console.log(`  저장됨: ${outputFilename}`);
        
        // WebP 형식 생성 (선택적)
        if (config.webp) {
            const webpFilename = generateOutputFilename(imagePath, size, 'webp');
            await image
                .resize(size.width)
                .webp({ quality: config.webpQuality })
                .toFile(webpFilename);
            
            console.log(`  WebP 생성됨: ${webpFilename}`);
        }
    }
}

// 메인 함수
async function optimizeImages() {
    try {
        // 대상 이미지 찾기
        const imagePaths = glob.sync(config.inputGlob, { ignore: `${config.outputDir}/**` });
        console.log(`총 ${imagePaths.length}개 이미지를 처리합니다.`);
        
        // 출력 디렉토리 생성
        if (!fs.existsSync(config.outputDir)) {
            fs.mkdirSync(config.outputDir, { recursive: true });
        }
        
        // 각 이미지 처리
        for (const imagePath of imagePaths) {
            await processImage(imagePath);
        }
        
        console.log('모든 이미지 최적화가 완료되었습니다.');
    } catch (error) {
        console.error('이미지 최적화 중 오류가 발생했습니다:', error);
    }
}

// 실행
optimizeImages(); 