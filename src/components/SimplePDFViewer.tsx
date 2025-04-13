import React, { useState, useEffect, useRef } from 'react';

interface SimplePDFViewerProps {
  pdfPath: string;
  pageNumber?: number;
  onLoadSuccess?: (totalPages: number) => void;
}

const SimplePDFViewer: React.FC<SimplePDFViewerProps> = ({ pdfPath, pageNumber = 1 }) => {
  const [loadFailed, setLoadFailed] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeSrc, setIframeSrc] = useState(`${pdfPath}#page=${pageNumber}&toolbar=1&navpanes=1&scrollbar=1`);
  
  // Atualizar o iframe src sempre que o número da página mudar
  useEffect(() => {
    console.log(`SimplePDFViewer: Atualizando para página ${pageNumber}`);
    setIframeSrc(`${pdfPath}#page=${pageNumber}&toolbar=1&navpanes=1&scrollbar=1`);
  }, [pdfPath, pageNumber]);
  
  useEffect(() => {
    // Verificar se o arquivo existe usando fetch
    fetch(pdfPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then(blob => {
        if (blob.type !== 'application/pdf') {
          throw new Error('O arquivo não é um PDF válido');
        }
      })
      .catch(error => {
        console.error("Erro ao verificar PDF:", error);
        setLoadFailed(true);
      });
  }, [pdfPath]);

  return (
    <div className="pdf-viewer">
      <div className="pdf-container border rounded p-2 text-center bg-light" style={{ height: '70vh', overflow: 'auto' }}>
        {loadFailed ? (
          <div className="alert alert-warning m-4">
            <h5><i className="bi bi-exclamation-triangle-fill me-2"></i>Não foi possível exibir o PDF</h5>
            <p>Houve um problema ao carregar o documento em {pdfPath}. Você pode tentar baixá-lo diretamente:</p>
            <a 
              href={pdfPath} 
              download="neofax.pdf"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-download me-2"></i>
              Baixar PDF
            </a>
          </div>
        ) : (
          <>
            <iframe
              ref={iframeRef}
              src={iframeSrc}
              title="PDF Viewer"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              allowFullScreen
            />
            <div className="position-fixed bottom-0 start-50 translate-middle-x mb-3 bg-dark text-white px-3 py-1 rounded-pill opacity-75">
              <span className="me-3">Página {pageNumber}</span>
              <a 
                href={pdfPath} 
                download="neofax.pdf"
                className="text-white text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-download me-1"></i>
                Baixar PDF
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SimplePDFViewer; 