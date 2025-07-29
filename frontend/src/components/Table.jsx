import React, { useState } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import axios from 'axios';
import { FiEdit2, FiTrash2, FiDownload, FiShare2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';

function Table({ invites, apiUrl, onEditInvite, handleDeleteInvite }) {
  const [loadingStates, setLoadingStates] = useState({});
  const [expandedRow, setExpandedRow] = useState(null);

  const generatePdf = async (invite) => {
    const apiUrlFrontend = 'https://wedd-i8ls.onrender.com';
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a5',
    });

    try {
      // Background
      doc.setFillColor(240, 240, 240);
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

      // QR Code
      const qrText = `${apiUrlFrontend}/invites/${invite.inviteId}`;
      const qrImage = await QRCode.toDataURL(qrText);
      doc.addImage(qrImage, 'PNG', 15, 15, 40, 40);

      // Guest Info
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(20);

      const titleMap = {
        'M': `M. ${invite.prenom} ${invite.nom}`,
        'Mme': `Mme ${invite.prenom} ${invite.nom}`,
        'Mlle': `Mlle ${invite.prenom} ${invite.nom}`,
        'couple': `M. & Mme ${invite.nom}`
      };

      const titleText = titleMap[invite.titre] || `${invite.prenom} ${invite.nom}`;
      doc.text(titleText, 15, 70);

      // Additional Info
      doc.setFontSize(12);
      doc.text(`Table: ${invite.nomTable || 'À définir'}`, 15, 80);
      doc.text(`ID: ${invite.inviteId}`, 15, 90);

      // Decorative elements
      doc.setDrawColor(100, 149, 237);
      doc.setLineWidth(0.5);
      doc.line(15, 95, 80, 95);

      return doc.output('blob');
    } catch (err) {
      console.error('Erreur génération PDF:', err);
      return null;
    }
  };

  const handleDownload = async (inviteId) => {
    setLoadingStates(prev => ({ ...prev, [inviteId]: 'pdf' }));
    const invite = invites.find(i => i._id === inviteId);
    const pdfBlob = await generatePdf(invite);
    if (pdfBlob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = `Invitation_${invite.nom}_${invite.prenom}.pdf`;
      link.click();
    }
    setLoadingStates(prev => ({ ...prev, [inviteId]: null }));
  };

  const handleWhatsAppShare = async (invite) => {
    setLoadingStates(prev => ({ ...prev, [invite._id]: 'whatsapp' }));
    try {
      const pdfBlob = await generatePdf(invite);
      if (!pdfBlob) throw new Error('PDF non généré');

      const formData = new FormData();
      formData.append('file', pdfBlob, `Invitation_${invite.nom}_${invite.prenom}.pdf`);

      const response = await axios.post(`${apiUrl}/api/uploadPDF`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const titleMap = {
        'M': `M. ${invite.prenom} ${invite.nom}`,
        'Mme': `Mme ${invite.prenom} ${invite.nom}`,
        'Mlle': `Mlle ${invite.prenom} ${invite.nom}`,
        'couple': `M. & Mme ${invite.nom}`
      };

      const titleText = titleMap[invite.titre] || `${invite.prenom} ${invite.nom}`;
      const message = `💌 Cher(e) ${titleText},\n\nNous avons le plaisir de vous inviter à notre mariage!\n\n📩 Téléchargez votre invitation ici: ${response.data.url}\n\nMerci de confirmer votre présence.`;

      window.open(`https://wa.me/237${invite.telephone}?text=${encodeURIComponent(message)}`, '_blank');
    } catch (error) {
      console.error('Erreur WhatsApp:', error);
      alert("Erreur lors du partage");
    } finally {
      setLoadingStates(prev => ({ ...prev, [invite._id]: null }));
    }
  };

  const toggleRowExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Invité
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden sm:table-cell">
                ID
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden md:table-cell">
                Contact
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invites.length > 0 ? (
              invites.map((invite) => (
                <React.Fragment key={invite._id}>
                  <tr 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleRowExpand(invite._id)}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={`${apiUrl}/uploads/${invite.image}`}
                            alt={`${invite.nom} ${invite.prenom}`}
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${invite.nom}${invite.prenom}&background=random`;
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {invite.prenom} {invite.nom}
                          </div>
                          <div className="text-sm text-gray-500 sm:hidden">
                            {invite.nomTable && `Table: ${invite.nomTable}`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                      {invite.inviteId}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      <div>+237 {invite.telephone}</div>
                      <div>{invite.nomTable && `Table ${invite.nomTable}`}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        invite.status === 'P' 
                          ? 'bg-green-100 text-green-800' 
                          : invite.status === 'A' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {invite.status === 'P' ? 'Confirmé' : invite.status === 'A' ? 'Décliné' : 'En attente'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditInvite(invite);
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Modifier"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteInvite(invite._id);
                          }}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Supprimer"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {expandedRow === invite._id && (
                    <motion.tr 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-blue-50"
                    >
                      <td colSpan="5" className="px-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Détails de l'invité</h4>
                            <div className="text-sm text-gray-500 space-y-1">
                              <p><span className="font-medium">Titre:</span> {invite.titre || 'Non spécifié'}</p>
                              <p><span className="font-medium">Nom complet:</span> {invite.prenom} {invite.nom}</p>
                              <p><span className="font-medium">Téléphone:</span> +237 {invite.telephone}</p>
                              <p><span className="font-medium">Table:</span> {invite.nomTable || 'À définir'}</p>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between">
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleDownload(invite._id)}
                                disabled={loadingStates[invite._id]}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                {loadingStates[invite._id] === 'pdf' ? (
                                  <ImSpinner8 className="animate-spin mr-2" />
                                ) : (
                                  <FiDownload className="mr-2" />
                                )}
                                Télécharger PDF
                              </button>
                              <button
                                onClick={() => handleWhatsAppShare(invite)}
                                disabled={loadingStates[invite._id]}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              >
                                {loadingStates[invite._id] === 'whatsapp' ? (
                                  <ImSpinner8 className="animate-spin mr-2" />
                                ) : (
                                  <FaWhatsapp className="mr-2" />
                                )}
                                Envoyer par WhatsApp
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  Aucun invité trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;