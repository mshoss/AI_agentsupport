import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Plus,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  User,
  Filter,
  Tag,
  Edit3,
  Trash2
} from 'lucide-react';
import type { KBArticle } from '../types';

interface KnowledgeBaseProps {
  articles: KBArticle[];
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ articles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<KBArticle | null>(null);

  const categories = [...new Set(articles.map(article => article.category))];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      'Authentication': 'bg-blue-100 text-blue-800 border-blue-200',
      'Billing': 'bg-green-100 text-green-800 border-green-200',
      'Technical': 'bg-purple-100 text-purple-800 border-purple-200',
      'Account': 'bg-orange-100 text-orange-800 border-orange-200',
      'General': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleArticleClick = (article: KBArticle) => {
    setSelectedArticle(article);
  };

  if (selectedArticle) {
    return (
      <div className="p-8">
        <div className="mb-6">
          <button
            onClick={() => setSelectedArticle(null)}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
          >
            ← Back to Knowledge Base
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{selectedArticle.title}</h1>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>By {selectedArticle.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedArticle.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{selectedArticle.views} views</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200">
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors duration-200">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedArticle.content}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Article Info</h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(selectedArticle.category)}`}>
                    {selectedArticle.category}
                  </span>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-700">Tags:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedArticle.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Created: {new Date(selectedArticle.createdAt).toLocaleDateString()}</p>
                    <p>Updated: {new Date(selectedArticle.updatedAt).toLocaleDateString()}</p>
                    <p>Views: {selectedArticle.views}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">Helpful</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{selectedArticle.helpful}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ThumbsDown className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-700">Not Helpful</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{selectedArticle.notHelpful}</span>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ 
                        width: `${(selectedArticle.helpful / (selectedArticle.helpful + selectedArticle.notHelpful)) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 text-center">
                    {Math.round((selectedArticle.helpful / (selectedArticle.helpful + selectedArticle.notHelpful)) * 100)}% found this helpful
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
            <p className="text-gray-600 mt-2">Browse and manage support documentation</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>New Article</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <button className="border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => handleArticleClick(article)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-gray-400" />
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3 mb-4">{article.content}</p>

            <div className="flex flex-wrap gap-1 mb-4">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
              {article.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                  +{article.tags.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{article.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{article.helpful}</span>
                </div>
              </div>
              <span>By {article.author}</span>
            </div>

            <div className="text-xs text-gray-500">
              Updated {new Date(article.updatedAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or create a new article.</p>
        </div>
      )}
    </div>
  );
};